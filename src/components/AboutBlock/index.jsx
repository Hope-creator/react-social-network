import React from "react";
import FlexTextBlock from "../FlexTextBlock";

import "./AboutBlock.scss";

const AboutBlock = ({ profileOwner, profile, setEditMode }) => {
  return (
    <>
      <div className="aboutBlock__header">
        <span>About</span>
        {profileOwner && (
          <button onClick={setEditMode} className="aboutBlock__button">
            <i className="fas fa-edit"></i>
          </button>
        )}
      </div>
      <div className="aboutBlock__content">
        <ul className={"aboutBlock__list"}>
          <li>
            <FlexTextBlock leftText="Name:" rightText={profile.name} />
          </li>
          {profile.profile.lookingForAJob ? (
            <li>
              <FlexTextBlock
                leftText="Looking for a job:"
                rightText={profile.profile.lookingForAJobDescription}
              />
            </li>
          ) : null}
          <li>
            <FlexTextBlock
              leftText="About me:"
              rightText={profile.profile.aboutMe}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default AboutBlock;
