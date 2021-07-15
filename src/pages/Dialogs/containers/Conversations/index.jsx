import React, { useEffect, useRef, useState } from "react";
import { withGetOnScroll } from "../../../../hoc/withGetOnScroll";
import ConversationItem from "../../../../components/ConversationItem";
import socket from "../../../../socket";
import { CancelTokens } from "../../../../api/api";
import NoContentBlock from "../../../../components/NoContentBlock";

const Conversations = ({
  request,
  getOnScroll,
  clearConversations,
  pageSize,
  getConversationsProfiles,
  conversationsProfiles,
  conversations,
  clearConversationsProfiles,
  updateConversation,
  ownerProfile,
  setCurrentConversation,
  readOnOpen,
  setCurrentConversationId,
}) => {
  const [conversationsProfilesState, setConversationsProfilesState] = useState(
    []
  );
  const [fetchProfiles, setFetchProfiles] = useState(false);

  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  //set profiles IDs for getting profiles
  useEffect(() => {
    conversations.forEach((conversation) => {
      if (!conversationsProfilesState.includes(conversation.peerId)) {
        setConversationsProfilesState([
          ...conversationsProfilesState,
          conversation.peerId,
        ]);
      }
    });
  }, [conversations, conversationsProfilesState]);

  //fetch only necessaries profiles
  useEffect(() => {
    conversationsProfilesState.forEach((id) => {
      if (
        !conversationsProfiles.find((profile) => id === profile._id) &&
        !fetchProfiles
      ) {
        if (!unmounted.current) {
          setFetchProfiles(true);
          getConversationsProfiles(id).then((res) => {
            if (res && !unmounted.current) setFetchProfiles(false);
          });
        }
      }
    });
  }, [
    fetchProfiles,
    conversationsProfilesState,
    getConversationsProfiles,
    conversationsProfiles,
  ]);

  const updateConversationHandler = (conversation) => {
    if (conversation) updateConversation(conversation);
  };

  useEffect(() => {
    request(1, pageSize);
    getOnScroll();
    return function cleanUp() {
      CancelTokens.dialogsCancel("Fetch canceled by user");
      clearConversations();
      clearConversationsProfiles();
    };
  }, [
    request,
    getOnScroll,
    clearConversations,
    pageSize,
    clearConversationsProfiles,
  ]);

  //update conversations

  useEffect(() => {
    socket.on("updateConversation", updateConversationHandler);
    return function cleanUp() {
      socket.off("updateConversation", updateConversationHandler);
    };
  });

  const conversationsItems = conversations.map((_conversation) => {
    return (
      <ConversationItem
        key={_conversation._id}
        profile={conversationsProfiles.find(
          (cProfile) => cProfile._id === _conversation.peerId
        )}
        conversation={_conversation}
        ownerProfile={ownerProfile}
        setCurrentConversation={setCurrentConversation}
        readOnOpen={readOnOpen}
        setCurrentConversationId={setCurrentConversationId}
      />
    );
  });

  return (
    <div>
      {conversationsItems.length > 0 ? (
        conversationsItems
      ) : (
        <NoContentBlock icon={<i className="far fa-envelope"></i>}>
          You don't have any conversations yet
        </NoContentBlock>
      )}
    </div>
  );
};

export default withGetOnScroll(Conversations);
