import React from "react";

import "./Contacts.scss";

export const Contacts = ({ profileOwner, contacts, setEditMode }) => {
  return (
    <div className={"contacts"}>
      <div className={"contacts__header"} >
        <span>Contacts</span>{" "}
        {profileOwner && (
          <button onClick={() => setEditMode()} className="contacts__button">
            <i className="fas fa-edit"></i>
          </button>
        )}
      </div>
      <div className={"contacts__itemsContainer"}>
        {Object.entries(contacts).map((el) => (
          <span className="contacts__item" key={el[0]}>
            {el[0]}:{" "}
            <a href={"//" + el[1]} rel="noreferrer" target="_blank">
              {el[1]}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
};
