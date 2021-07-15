import React from "react";
import { Form } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import FormTextareaAutosize from "../FormTextareaAutosize";
import Avatar from "../Avatar";

import "./SendMessageModal.scss";

const SendMessageModal = ({
  ownerId,
  peerId,
  peerPhoto,
  peerName,
  changeShowModal,
  onSendHandler,
}) => {
  const history = useHistory();

  const onGoToMessagesClick = () => {
    history.push("/dialogs");
  };

  if (!ownerId) return <div>Need to log in for messaging...</div>;
  if (!peerId) return <div>Loading...</div>;

  const onSubmit = (values) => {
    const date = Date.now();
    const text = values.messageText;
    const message = {
      from: ownerId,
      peerId: peerId,
      ts: date,
      text: text,
      attachments: [],
    };
    onSendHandler(message, peerId, 0);
  };

  return (
    <FocusTrap>
      <div className="sendMessageModal">
        <div className="sendMessageModal__form">
          <div className="sendMessageModal__header">
            <div className="sendMessageModal__header-title">New message</div>
            <div
              type="button"
              onClick={onGoToMessagesClick}
              className="sendMessageModal__header-link_block"
            >
              Go to messages
            </div>
            <div
              type="button"
              className={"sendMessageModal__header-button"}
              onClick={() => changeShowModal()}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="sendMessageModal__content">
            <div className="sendMessageModal__content-header">
              <Link to={`/profile/${peerId}`}>
                <Avatar
                  className="sendMessageModal__content-avatar"
                  src={peerPhoto}
                />
              </Link>
              <Link to={`/profile/${peerId}`}>
                <h3 className="sendMessageModal__name">{peerName}</h3>
              </Link>
            </div>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <FormTextareaAutosize
                    className="sendMessageModal__textarea"
                    name="messageText"
                    maxRows="10"
                    minRows="8"
                  />
                  <button className="sendMessageModal__content-button">
                    Send
                  </button>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default SendMessageModal;
