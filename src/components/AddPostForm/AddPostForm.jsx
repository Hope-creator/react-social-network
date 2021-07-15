import React, { useState } from "react";
import { Form } from "react-final-form";
import { fileType, maxLength } from "../../utils/validators/validators";
import FormTextareaAutosize from "../FormTextareaAutosize";
import FormMediaUpload from "../FormMediaUpload";
import FormButton from "../FormButton";

import "./AddPostForm.scss";

const AddPostForm = ({ onCreatePostHandler }) => {
  const [attachments, setAttachments] = useState([]);
  const [picturesCount, setPicturesCount] = useState(0);
  const [videosCount, setVideosCount] = useState(0);

  const createNew = (text, attachments) => {
    let datenow = Date.now();
    let data = new FormData();
    attachments && attachments.map((file) => data.append("attachments", file));
    text && data.append("text", text);
    data.append("ts", datenow);
    onCreatePostHandler(data);
  };

  const onChangeFile = (files) => {
    if (files) {
      let arrFiles = [];
      let pics = 0;
      let vids = 0;
      for (let i = 0; i < files.length; i++) {
        if (files[i].type.match("image")) pics++;
        if (files[i].type.match("video")) vids++;
        arrFiles.push(files[i]);
      }
      setAttachments(attachments.concat(arrFiles));
      setPicturesCount(picturesCount + pics);
      setVideosCount(videosCount + vids);
    }
  };

  const clearAttachemnts = (type) => {
    setAttachments((prevFiles) =>
      prevFiles.filter((item) => (item.type.match(type) ? false : true))
    );
  };

  const onSubmit = (values, form) => {
    createNew(values.newPostBody, attachments);
    setAttachments([]);
    setPicturesCount(0);
    setVideosCount(0);
    setTimeout(form.reset);
    values.newPostPhoto = "";
    values.newPostVideo = "";
  };

  const handleClearVideos = React.useCallback(() => {
    clearAttachemnts("video");
    setVideosCount(0);
  }, []);

  const handleClearImages = React.useCallback(() => {
    clearAttachemnts("image");
    setPicturesCount(0);
  }, []);

  return (
    <Form
      onSubmit={onSubmit}
      render={(formProps) => {
        const clearField = formProps.form.change;
        return (
          <form onSubmit={formProps.handleSubmit}>
            <FormTextareaAutosize
              name="newPostBody"
              validate={maxLength(500)}
              className="addPostForm__textarea"
              placeholder="Share your status..."
              minRows="8"
              maxRows="16"
            />
            <div className="addPostForm__footer">
              <div className="addPostForm__media">
                <div>
                  <FormMediaUpload
                    name="newPostPhoto"
                    count={picturesCount}
                    validate={fileType("image")}
                    onAddHandle={onChangeFile}
                    onClearHandle={handleClearImages}
                    clearField={clearField}
                    accept=".jpg, .jpeg, .png"
                    icon={<i className="far fa-image"></i>}
                  />
                </div>
                <div className="addPostForm__media-video">
                  <FormMediaUpload
                    name="newPostVideo"
                    count={videosCount}
                    validate={fileType("video")}
                    onAddHandle={onChangeFile}
                    onClearHandle={handleClearVideos}
                    clearField={clearField}
                    accept=".mp4, .mov, .wmv, .flv, .webm, .mkv"
                    icon={<i className="fas fa-video"></i>}
                  />
                </div>
              </div>
              {!formProps.pristine && (
                <FormButton style={{ marginRight: "10px" }} type="submit">
                  Send
                </FormButton>
              )}
            </div>
          </form>
        );
      }}
    />
  );
};

export default AddPostForm;
