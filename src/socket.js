import { io } from "socket.io-client";
import { dialogsActionCreators } from "./modules/dialogs";

const URL = "http://localhost:5000";
const socket = io(URL, {
  autoConnect: false,
  reconnectionAttempts: 3,
});

export const onMessage = (content, to, context) => (dispatch) => {
  // if context == 0 message sended not from messages page,
  // else message send from messages page and message return with conversation
  socket.emit(
    "message",
    {
      content,
      to,
      context,
    },
    (response) => {
      if (response.success && response.message)
        dispatch(dialogsActionCreators.setNewOneMessage(response.message));
    }
  );
};

socket.on("connect_error", (err) => {
  console.log(err);
});

export const readConversation = (conversationId) => {
  socket.emit("readConversation", conversationId);
};

export default socket;
