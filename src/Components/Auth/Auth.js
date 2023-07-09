import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser, getUser } from "../../Common/Services/AuthService";
import Header from "../About/Header";
import Footer from "../Footer/Footer";
import About from "../About/About";
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
      <div className="button-row">
        <Header />
        <div className="navbar-container">
          <nav className="navbar">
            <ul className="navbar-menu">
              <li>
                <Link to="/register">register</Link>
              </li>
              <li>
                <Link to="/login">login</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <About />
      <Footer />
    </div>
  );
};

export default AuthModule;
