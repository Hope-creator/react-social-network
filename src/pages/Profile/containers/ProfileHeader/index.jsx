import React, { useState } from "react";
import Preloader from "../../../../parts/preloader";
import Status from "../../../../components/Status";
import ProfileAbout from "../../../../components/AboutBlock";
import ProfileFriends from "../../../../components/FriendsBlock";
import Avatar from "../../../../components/Avatar";
import AvatarWithInput from "../../../../components/AvatarWithInput";
import SendMessageModal from "../../../../components/SendMessageModal";
import { Contacts } from "../../../../components/Contacts";

import "./ProfileHeader.scss";

const ProfileHeader = ({
  profile,
  savePhoto,
  profileOwner,
  onMessageThunk,
  ownerId,
  updateStatus,
  setEditMode,
  friends,
}) => {
  const [showModal, setShowModal] = useState(false);

  const changeShowModal = () => {
    setShowModal(!showModal);
  };

  const updateAvatar = (e) => {
    savePhoto(e.target.files[0]);
  };

  if (!profile) return <Preloader />;

  return (
    <div className="profileHeader">
      <div className="profileHeader__header">
        {profileOwner ? (
          <AvatarWithInput
            className="profileHeader__avatar"
            src={profile.profile.profilePicture}
            onUpdateHandler={updateAvatar}
          />
        ) : (
          <Avatar
            className="profileHeader__avatar"
            src={profile.profile.profilePicture}
          />
        )}
        <h3 className="profileHeader__name"> {profile.name} </h3>
        {!profileOwner && (
          <button
            className="profileHeader__button"
            onClick={() => changeShowModal()}
          >
            Message
          </button>
        )}
        {!profileOwner && showModal && (
          <SendMessageModal
            onSendHandler={onMessageThunk}
            ownerId={ownerId}
            peerId={profile._id}
            peerPhoto={profile.profile.profilePicture}
            peerName={profile.name}
            changeShowModal={changeShowModal}
          />
        )}
      </div>
      <div className="profileHeader__divider"></div>
      <div className="profileHeader__footer">
        <Status
          profileOwner={profileOwner}
          status={profile.profile.status}
          updateStatus={updateStatus}
        />
      </div>
      <div className="profileHeader__info">
        <div className="profileHeader__info-contacts">
          <Contacts
            profileOwner={profileOwner}
            contacts={profile.profile.contacts}
            setEditMode={setEditMode}
          />
        </div>
        <div className="profileHeader__info-about">
          <ProfileAbout
            profile={profile}
            profileOwner={profileOwner}
            setEditMode={setEditMode}
          />
        </div>
        <div className="profileHeader__info-friends">
          <ProfileFriends profileOwner={profileOwner} friends={friends} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
