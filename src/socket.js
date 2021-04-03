import { io } from "socket.io-client";

const URL = "https://boiling-tundra-00901.herokuapp.com/";
const socket = io(URL, {
    autoConnect: false,
    reconnectionAttempts: 3
});

const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE';
const setMessageAction = (newMessage) => ({
    type: SET_NEW_MESSAGE,
    newMessage
})

export const onMessage = (content, to, context) => dispatch => {
     // if context == 0 message sended not from messages page,
    // else message send from messages page and message return with conversation
    socket.emit("message", {
        content,
        to,
        context
    }, (response)=> {
        if(response.success && response.message) dispatch((setMessageAction(response.message)))
    });

}


socket.on("connect_error", (err) => {
    console.log(err); 
  });
  

export const readConversation = (conversationId) => {
    socket.emit("readConversation", conversationId)
}

export default socket;