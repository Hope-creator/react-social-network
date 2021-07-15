import React from "react";
import { FORM_ERROR } from "final-form";
import { Field, Form } from "react-final-form";
import FormTextareaAutosize from "../FormTextareaAutosize";

import "./AboutForm.scss";

const AboutForm = ({ profile, updateProfile, setEditMode }) => {
  const onSubmit = async (values) => {
    let newProfile = {
      ...profile,
      name: values.name,
      profile: {
        ...profile.profile,
        lookingForAJob: !!values.lookingForAJob,
        lookingForAJobDescription: values.lookingForAJobDescription,
        aboutMe: values.aboutMe,
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
        name: profile.name,
        lookingForAJob: profile.profile.lookingForAJob ? "true" : "",
        lookingForAJobDescription:
          profile.profile.lookingForAJobDescription || "",
        aboutMe: profile.profile.aboutMe,
      }}
      render={({ handleSubmit, submitError }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <div className="aboutForm__field">
                <span>Name:</span>
                <Field
                  className="aboutForm__input"
                  name="name"
                  component="input"
                />
              </div>
              <div className="aboutForm__field">
                <span>Looking for a job:</span>
                <Field
                  name="lookingForAJob"
                  type="radio"
                  value="true"
                  component="input"
                />{" "}
                Yes
                <Field
                  name="lookingForAJob"
                  type="radio"
                  value=""
                  component="input"
                />{" "}
                No
                <div>
                  <FormTextareaAutosize
                    className="aboutForm__input"
                    name="lookingForAJobDescription"
                    placeholder="Skills"
                  />
                </div>
              </div>
              <div className="aboutForm__field">
                <span>About me:</span>
                <FormTextareaAutosize
                  className="aboutForm__input"
                  name="aboutMe"
                  placeholder="Tell anyting about you"
                />
              </div>
              {submitError && (
                <div className="aboutForm__errorContainer">
                  {submitError.map((err) => (
                    <div className="aboutForm__errorContainer-error" key={err}>
                      {err}
                    </div>
                  ))}
                </div>
              )}
              <button className="aboutForm__button" type="submit">
                Save
              </button>
              <button
                className="aboutForm__button"
                type="button"
                onClick={() => setEditMode()}
              >
                Cancel
              </button>
            </div>
          </form>
        );
      }}
    />
  );
};

export default AboutForm;
