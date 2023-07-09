import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "../../Common/Styles/AuthForm.css";
import { checkUser } from "../../Common/Services/AuthService";

// You can pass props using the spread operator to throw them on an object if there are too many to break out
const ProtectedRoute = ({ element: Component, ...rest }) => {
  console.log("element: ", Component);
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/");
  };
  if (checkUser()) {
    return <Component />;
  } else {
    return (
      <div>
        <Header />
        <div className="form-group">
          <p
            style={{ color: "#ffd801", fontSize: "18px", textAlign: "center" }}
          >
            Unauthorized!
          </p>
          <button
            className="authButton"
            onClick={goBackHandler}
          >
            Go Back
          </button>
        </div>
        <Footer />
      </div>
    );
  }
};

export default ProtectedRoute;
