import React from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../Common/Services/AuthService";

const NavBar = () => {
  const navigate = useNavigate();

  // log out user when clicking the button on the menubar
  const logoutHandler = () => {
    logoutUser(navigate);
  };

  return (
    <nav>
      <ul class="navigation">
        {/* Make use of routing in navigation */}
        <li>
          <button onClick={logoutHandler}>Log Out</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
