import React from "react";
import NavBar from "../NavBar/NavBar";
import About from "./About";
import Footer from "../Footer/Footer";
import TypingEffect from "../TypingTest/TypingEffect";
import psyduckGIF from "../../Common/Images/psyduck.gif";

const AboutModule = () => {
  return (
    <div>
      <NavBar />
      <div className="welcome-header" style={{ marginTop:"-80px", marginBottom:"-60px"}}>
        <img src={psyduckGIF} alt="Ducky GIF"/>
        <TypingEffect text={"ducky see, ducky code, ducky type"} />
      </div>
      <About />
      <Footer />
    </div>
  );
};

export default AboutModule;
