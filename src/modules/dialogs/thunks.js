import { profileApi, dialogsApi } from "../../api/api";
import { onMessage } from "../../socket";
import {
  setConversationProfiles,
  setOwnerProfile,
  setCurrentConversationProfile,
  setNewMessages,
  setMessagesCount,
  setNewConversations,
  setConversationsCount,
} from "./actionCreators";

const getOwnerProfile = (ownerId) => async (dispatch) => {
  try {
    let response = await profileApi.getProfile(ownerId);
    if (response && response.data.success)
      dispatch(setOwnerProfile(response.data.profile));
  } catch (e) {
    console.log(e);
  }
};

const getCurrentConversationProfile = (id) => async (dispatch) => {
  try {
    let response = await profileApi.getProfile(id);
    if (response && response.data.success)
      dispatch(setCurrentConversationProfile(response.data.profile));
  } catch (e) {
    console.log(e);
  }
};

const getConversationsProfiles = (id) => async (dispatch) => {
  try {
    let response = await profileApi.getProfile(id);
    if (response && response.data.success) {
      dispatch(setConversationProfiles(response.data.profile));
      return "Success";
    } else {
      return "Failed";
    }
  } catch (e) {
    console.log(e);
  }
};

const getConversations = (currentPage, pageSize) => async (dispatch) => {
  try {
    let response = await dialogsApi.getConversations(currentPage, pageSize);
    if (response && response.data.success) {
      dispatch(setNewConversations(response.data.conversations));
      dispatch(setConversationsCount(response.data.conversationsCount));
      response.data.conversations.forEach(async (c) => {
        getConversationsProfiles(c.peerId)(dispatch);
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const getMessages = (currentPage, pageSize, peerId) => async (dispatch) => {
  try {
    let response = await dialogsApi.getMessages(
      currentPage,
      pageSize,
      peerId
    );
    if (response && response.data.success) {
      dispatch(setNewMessages(response.data.messages));
      dispatch(setMessagesCount(response.data.messagesCount));
    }
  } catch (e) {
    console.log(e);
  }
};

const onMessageThunk = (content, to, context) => (dispatch) => {
  onMessage(content, to, context)(dispatch);
};

export {
  getOwnerProfile,
  getCurrentConversationProfile,
  getConversationsProfiles,
  getConversations,
  getMessages,
  onMessageThunk,
};
