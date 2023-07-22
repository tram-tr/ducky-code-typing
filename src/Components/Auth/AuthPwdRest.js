import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorMessage from "./ErrorMessage";
import { requestPasswordReset, checkUser, getUser } from "../../Common/Services/AuthService";
import "../../Common/Styles/AuthForm.css";

const AuthPwdReset = () => {
  const navigate = useNavigate();
  // redirect already authenticated users back to home
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (checkUser()) {
      //alert("You are already logged in");
      const username = getUser().get("username");
      navigate(`/${username}/main`);
    }
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await requestPasswordReset(email);
      // Password reset request successful
      setMessage(
        "Password reset link has been sent to your email. Please check your inbox."
      );
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Header />
      <h1 className="header-form">reset password</h1>
      <ErrorMessage message={message} />
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
        forgotPwd={true}
      />
      <Footer />
    </div>
  );
};

export default AuthPwdReset;
