import React from "react";

import "./Status.scss";

const Status = ({ profileOwner, status, updateStatus }) => {
  const [editMode, setEditMode] = React.useState(false);
  const [_status, _setStatus] = React.useState(status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(_status);
  };

  const onStatusChange = (e) => {
    _setStatus(e.currentTarget.value);
  };

  const statusMarkup = () => {
    if (profileOwner)
      return status ? (
        <span className="status__text">{status}</span>
      ) : (
        <div className="status__text_no-text">Change status</div>
      );
    else {
      return status ? <span className="status__text">{status}</span> : null;
    }
  };

  return (
    <div>
      {!editMode && <span onClick={activateEditMode}>{statusMarkup()}</span>}
      {editMode && (
        <input
          value={_status}
          onChange={onStatusChange}
          autoFocus={true}
          onBlur={deactivateEditMode}
        />
      )}
    </div>
  );
};

export default Status;
