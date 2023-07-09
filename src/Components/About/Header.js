import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TypingEffect from "../TypingTest/TypingEffect";
import psyduckGIF from "../../Common/Images/psyduck.gif";
import "../../Common/Styles/Header.css";
import { checkUser, getUser } from "../../Common/Services/AuthService";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (checkUser()) {
      const username = getUser().get("username");
      navigate(`/${username}/main`);
    }
  };

  return (
    <div className="header">
      <Link className="header-link" to="/" onClick={handleClick}>
        <h1>duckytype</h1>
      <img src={psyduckGIF} alt="Ducky GIF" />
      <TypingEffect text={"ducky see, ducky code, ducky type"} />
      </Link>
    </div>
  );
};

export default Header;
