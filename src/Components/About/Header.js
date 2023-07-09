import React from "react";
import TypingEffect from "../TypingTest/TypingEffect";
import psyduckGIF from "../../Common/Images/psyduck.gif";
import "../../Common/Styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>duckytype</h1>
      <img src={psyduckGIF} alt="Ducky GIF" />
      <TypingEffect text={"ducky see, ducky code, ducky type"} />
    </div>
  );
};

export default Header;