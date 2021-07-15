import React from "react";
import { FORM_ERROR } from "final-form";
import { Form } from "react-final-form";
import FormInput from "../FormInput";

import "./ContactsForm.scss";

const ContactsForm = ({ profile, updateProfile, setEditMode }) => {
  const onSubmit = async (values) => {
    let newProfile = {
      ...profile,
      profile: {
        ...profile.profile,
        contacts: {
          facebook: values.facebook,
          github: values.github,
          instagram: values.instagram,
          mainLink: values.mainLink,
          vk: values.vk,
          website: values.website,
          youtube: values.youtube,
          twitter: values.twitter,
          mainlink: values.mainlink,
        },
      },
    };
    let errors;
    await updateProfile(newProfile)
      .then((response) => {
        if (response === "success") setEditMode();
        else {
          return response ? (errors = response.map((err) => err)) : null;
        }
      })
      .catch((err) => (errors = [err]));
    return { [FORM_ERROR]: errors };
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        facebook: profile.profile.contacts.facebook,
        github: profile.profile.contacts.github,
        instagram: profile.profile.contacts.instagram,
        mainLink: profile.profile.contacts.mainLink,
        twitter: profile.profile.contacts.twitter,
        vk: profile.profile.contacts.vk,
        website: profile.profile.contacts.website,
        youtube: profile.profile.contacts.youtube,
      }}
      render={({ handleSubmit, submitError }) => (
        <form onSubmit={handleSubmit}>
          {Object.keys(profile.profile.contacts).map((key) => {
            return (
              <div key={key} className="contactForm__field">
                <span>{key}:</span>
                <FormInput name={key} placeholder={key + ".com"} />
              </div>
            );
          })}
          {submitError && (
            <div className="contactForm__errorContainer">
              {submitError.map((err) => {
                return (
                  <div className="contactForm__errorContainer-error" key={err}>
                    {err}
                  </div>
                );
              })}
            </div>
          )}
          <button className="contactForm__button" type="submit">
            Save
          </button>
          <button className="contactForm__button" onClick={() => setEditMode()}>
            Cancel
          </button>
        </form>
      )}
    />
  );
};

export default ContactsForm;
