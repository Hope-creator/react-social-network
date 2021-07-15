import React from "react";
import { useState } from "react";
import AboutForm from "../AboutForm";
import ContactsForm from "../ContactsForm";

import "./ProfileInfoForm.scss";

const ProfileInfoForm = ({ profile, setEditMode, updateProfile }) => {
  let [currentForm, setCurrentForm] = useState("About");
  return (
    <div className="profileInfoForm">
      <div className="profileInfoForm__content">
        {currentForm === "About" ? (
          <AboutForm
            profile={profile}
            setEditMode={setEditMode}
            updateProfile={updateProfile}
          />
        ) : currentForm === "Contacts" ? (
          <ContactsForm
            profile={profile}
            setEditMode={setEditMode}
            updateProfile={updateProfile}
          />
        ) : null}
      </div>
      <div className="profileInfoForm__buttonsWrap">
        <button
          className="profileInfoForm__button"
          onClick={() => setCurrentForm("About")}
        >
          About
        </button>
        <button
          className="profileInfoForm__button"
          onClick={() => setCurrentForm("Contacts")}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
