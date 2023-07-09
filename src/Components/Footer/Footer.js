import React from "react";
import { VscCode } from "react-icons/vsc";
import "../../Common/Styles/Footer.css";

const Footer = () => {
  return (
    <footer>
      <p>
        traamtr |{" "}
        <a
          href="https://github.com/tram-tr/ducky-coding-type"
          className="footer-link"
        >
          <span className="footer-icon-wrapper">
            <VscCode size="20" className="footer-icon" /> github
          </span>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
