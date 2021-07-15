import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="noMatch">
      <h2>404: Page not found</h2>
      <div>
        Sorry, we've misplaced that URL or it's pointing to something that
        doesn't exist.{" "}
        <div>
          <Link to="/profile" className="noMatch__link">
            Head back to profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;
