const authenticateTokenSocket = require("./utils/middleware/checkAuthSocket");
const { Conversation } = require("./utils/models/conversation");
const { Message } = require("./utils/models/message");
module.exports = function (io) {
  io.on("connection", async (socket) => {
    const _id = socket.handshake.auth._id;
    socket.join(_id);
    console.log("User connected", _id);
    try {
      const unreadConversations = await Conversation.find({
        $and: [{ fromId: _id }, { unread: true }],
      }).countDocuments();
      if (unreadConversations)
        socket.emit("unreadConversations", unreadConversations);
    } catch (err) {
      console.log("ERROR ON UNREAD CONVESATION EMIT:", err);
      socket.emit("unreadConversations");
    }

    socket.on("readConversation", async (conversationId) => {
      try {
        const readConversation = await Conversation.findOneAndUpdate(
          {
            $and: [{ _id: conversationId }, { unread: true }],
          },
          {
            unread: false,
          }
        );
        if (readConversation) {
          try {
            const unreadConversations = await Conversation.find({
              $and: [{ fromId: _id }, { unread: true }],
            }).countDocuments();
            socket.emit("unreadConversations", unreadConversations);
          } catch (err) {
            console.log(
              "ERROR ON SEND UNREAD CONVERSATION AFTER READING:",
              err
            );
          }
        }
      } catch (err) {
        console.log("ERR ON READ CONVERSATION:", err);
      }
    });

    socket.on("message", async ({ content, to, context }, callback) => {
      // if context == 0 message sended not from messages page,
      // else message send from messages page and message return with conversation
      const peerId = to;
      const message = content;
      const fromId = message.from;
      const ts = message.ts;
      const text = message.text;
      const newMessage = new Message({
        fromId: fromId,
        peerId: peerId,
        ts: ts,
        text: text,
      });

      try {
        const isConversationExist = await Conversation.exists({
          fromId: fromId,
          peerId: peerId,
        });
        const savedMessage = await newMessage.save();

        if (isConversationExist) {
          // if conversation already exist

          const conversationFrom = await Conversation.findOneAndUpdate(
            { fromId: fromId, peerId: peerId },
            { lastMessage: savedMessage },
            { new: true }
          );
          const conversationTo = await Conversation.findOneAndUpdate(
            { fromId: peerId, peerId: fromId },
            { lastMessage: savedMessage, unread: true },
            { new: true }
          );

          const unreadConversationsTo = await Conversation.find({
            $and: [{ fromId: peerId }, { unread: true }],
          }).countDocuments();

          if (
            conversationFrom &&
            conversationTo &&
            savedMessage &&
            unreadConversationsTo
          ) {
            socket.to(peerId).emit("message", {
              message: savedMessage,
            });
            socket.to(peerId).emit("updateConversation", conversationTo);
            socket
              .to(peerId)
              .emit("unreadConversations", unreadConversationsTo);
            if (context === 0) {
              callback({
                success: true,
              });
            } else {
              callback({
                success: true,
                message: savedMessage,
              });
            }
          } else {
            callback({
              success: false,
            });
          }
        } else {
          // if new conversation create
          const newConversationFrom = new Conversation({
            fromId: fromId,
            peerId: peerId,
            ts: ts,
            lastMessage: savedMessage,
            unread: false,
          });
          const newConversationTo = new Conversation({
            fromId: peerId,
            peerId: fromId,
            ts: ts,
            lastMessage: savedMessage,
            unread: true,
          });
          const conversationFrom = await newConversationFrom.save();
          const conversationTo = await newConversationTo.save();
          const unreadConversationsTo = await Conversation.find({
            $and: [{ fromId: peerId }, { unread: true }],
          }).countDocuments();

          if (
            conversationFrom &&
            conversationTo &&
            savedMessage &&
            unreadConversationsTo
          ) {
            socket.to(peerId).emit("updateConversation", conversationTo);
            socket.to(peerId).emit("message", {
              message: savedMessage,
            });
            socket
              .to(peerId)
              .emit("unreadConversations", unreadConversationsTo);

            if (context === 0) {
              callback({ success: true });
            } else {
              callback({
                success: true,
                message: savedMessage,
              });
            }
          } else {
            callback({
              success: false,
            });
          }
        }
      } catch (error) {
        console.log("SOCKET IO MESSAGE ERROR", error);
        callback({
          success: false,
        });
      }
    });
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.session;
    const isAuth = authenticateTokenSocket(token);
    if (!token || !isAuth) {
      console.log("ERROR", isAuth);
      return next(new Error("Not authorized"));
    } else {
      socket.handshake.auth = { _id: isAuth };
      return next();
    }
  });
};
