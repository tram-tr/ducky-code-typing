import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser, getUser } from "../../Common/Services/AuthService";
import TypingEffect from "../TypingTest/TypingEffect";
import psyduckGIF from "../../Common/Images/psyduck.gif";
import "../../Common/Styles/Auth.css";

const AuthModule = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      alert("You are already logged in");
      const username = getUser().get("username");
      navigate(`/${username}/main`);
    }
  }, [navigate]);

  return (
    <div className="auth-module-container">
      <h1>duckytype</h1>
      <img src={psyduckGIF} alt="Ducky GIF" />
      <TypingEffect text={"ducky see, ducky code, ducky type"} />
      <Link to="/register">
        <button className="auth-module-button">Register</button>
      </Link>
      <br />
      <br />
      <Link to="/login">
        <button className="auth-module-button">Login</button>
      </Link>
    </div>
  );
};

export default AuthModule;
