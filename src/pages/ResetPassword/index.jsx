import React from "react";
import { useState } from "react";
import ResetForm from "./containers/ResetForm";
import { ResetSuccessForm } from "./containers/ResetSuccessForm";

const ResetPassword = ({ resetPasswordGetCode }) => {
  const [success, setSuccess] = useState(false);

  return success ? (
    <ResetSuccessForm setSuccess={setSuccess} />
  ) : (
    <ResetForm
      resetPasswordGetCode={resetPasswordGetCode}
      setSuccess={setSuccess}
    />
  );
};

export default ResetPassword;
