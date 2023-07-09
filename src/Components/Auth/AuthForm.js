import React from "react";
import { Link } from "react-router-dom";
import Header from "../About/Header";
import Footer from "../Footer/Footer";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  // Display register form
  if (!isLogin) {
    return (
      <div>
        <div className="register-form">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                id="username-input"
                value={user.username}
                onChange={onChange}
                name="username"
                placeholder="username"
                required
              />
            </div>
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                id="first-name-input"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
                placeholder="first name"
              />
            </div>
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                id="last-name-input"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
                placeholder="last name"
              />
            </div>{" "}
            <div className="form-group">
              <br />
              <input
                type="email"
                className="form-control"
                id="email-input"
                value={user.email}
                onChange={onChange}
                name="email"
                placeholder="email"
              />
            </div>{" "}
            <div className="form-group">
              <br />
              <input
                type="password"
                className="form-control"
                id="password-input"
                value={user.password}
                onChange={onChange}
                name="password"
                min="0"
                placeholder="password"
                required
              />
            </div>
            <div className="form-group">
              <br />
              <input
                type="password"
                className="form-control"
                id="verify-password-input"
                value={user.verifyPassword}
                onChange={onChange}
                name="verifyPassword"
                min="0"
                placeholder="verify password"
                required
              />
            </div>
            <br />
            <div className="form-group">
              <button
                type="submit"
                className="authButton"
                onSubmit={onSubmit}
              >
                Sign Up
              </button>
              <p className="authSubtext">
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    // Otherwise, display login form
    return (
      <div>
        <div className="login-form">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="form-group">
              <br />
              <input
                type="text"
                className="form-control"
                id="username-input"
                value={user.email}
                onChange={onChange}
                name="username"
                placeholder="username"
                required
              />
            </div>{" "}
            <div className="form-group">
              <br />
              <input
                type="password"
                className="form-control"
                id="password-input"
                value={user.password}
                onChange={onChange}
                name="password"
                placeholder="password"
                min="0"
                required
              />
            </div>
            <br />
            <div className="form-group">
              <button
                type="submit"
                className="authButton"
                onSubmit={onSubmit}
              >
                Sign In
              </button>
              <p className="authSubtext">
                Don't have an account?{" "}
                <Link to="/register">Create an Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default AuthForm;
