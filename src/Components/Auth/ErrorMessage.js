import React from "react";
import "../../Common/Styles/AuthForm.css"

const ErrorMessage = ({ message }) => {
  const errorStyle = {
    color: "#ffd801",
    fontSize: "15px",
    marginTop: "5px",
  };

  return message && <p className="errorMessage">{message}</p>;
};

export default ErrorMessage;
