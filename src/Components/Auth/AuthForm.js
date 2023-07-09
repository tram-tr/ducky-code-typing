import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {
  // Display register form
  if (!isLogin) {
    return (
      <div>
        <h1 className="header">register</h1>
        <div className="register">
          <form onSubmit={onSubmit} autoComplete="off">
            <div className="form-group">
              <label>username</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="username-input"
                value={user.username}
                onChange={onChange}
                name="username"
                required
              />
            </div>
            <div className="form-group">
              <label>first name</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="first-name-input"
                value={user.firstName}
                onChange={onChange}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <label>last name</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="last-name-input"
                value={user.lastName}
                onChange={onChange}
                name="lastName"
              />
            </div>{" "}
            <div className="form-group">
              <label>email</label>
              <br />
              <input
                type="email"
                className="form-control"
                id="email-input"
                value={user.email}
                onChange={onChange}
                name="email"
              />
            </div>{" "}
            <div className="form-group">
              <label>password</label>
              <br />
              <input
                type="password"
                className="form-control"
                id="password-input"
                value={user.password}
                onChange={onChange}
                name="password"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label>verify password</label>
              <br />
              <input
                type="password"
                className="form-control"
                id="verify-password-input"
                value={user.verifyPassword}
                onChange={onChange}
                name="verifyPassword"
                min="0"
                required
              />
            </div>
            <br />
            <hr />
            <div className="form-group">
              <button type="submit" className="registerButton" onSubmit={onSubmit}>
                Sign Up
              </button>
              <p className="registerSubtext">
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
        <h1 className="header">login</h1>
        <div className="login">
          <form onSubmit={onSubmit} autoComplete="off">
          <div className="form-group">
              <label>username</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="username-input"
                value={user.email}
                onChange={onChange}
                name="username"
                required
              />
            </div>{" "}
            <div className="form-group">
              <label>password</label>
              <br />
              <input
                type="password"
                className="form-control"
                id="password-input"
                value={user.password}
                onChange={onChange}
                name="password"
                min="0"
                required
              />
            </div>
            <br />
            <hr />
            <div className="form-group">
              <button type="submit" className="registerButton" onSubmit={onSubmit}>
                Sign In
              </button>
              <p className="registerSubtext">
                Don't have an account? <Link to="/register">Create an Account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default AuthForm;
