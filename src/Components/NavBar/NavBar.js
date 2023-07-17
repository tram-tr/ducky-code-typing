import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getUser,
  logoutUser,
} from "../../Common/Services/AuthService";
import {
  BiSolidUserDetail,
  BiSolidKeyboard,
  BiLogOut,
  BiInfoCircle,
} from "react-icons/bi";
import "../../Common/Styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const username = getUser().get("username");

  // log out user when clicking the button on the menubar
  const logoutHandler = () => {
    logoutUser(navigate);
  };

  return (
    <div>
      <Link className="auth-header-link" to={`/${username}/main`}>
        <h1>duckytype</h1>
      </Link>
      <div className="auth-navbar-container">
        <nav className="auth-navbar">
          <ul className="auth-navbar-menu">
            <li>
              <Link to={`/${username}/main`}>
                <BiSolidUserDetail className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to={`/${username}/typing-test`}>
                <BiSolidKeyboard className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link to={`/${username}/about`}>
                <BiInfoCircle className="menu-icon" />
              </Link>
            </li>
            <li>
              <Link onClick={logoutHandler}>
                <BiLogOut className="menu-icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
