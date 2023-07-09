import React, { useEffect, useState } from "react";
import {
  checkUser,
  loginUser,
  getUser,
} from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ErrorMessage from "./ErrorMessage";
import "../../Common/Styles/AuthForm.css";

const AuthLogin = () => {
  const navigate = useNavigate();

  // redirect already authenticated users back to home
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checkUser()) {
      //alert("You are already logged in");
      const username = getUser().get("username");
      navigate(`/${username}/main`);
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (currentUser && add) {
      loginUser(currentUser).then((userLoggedIn) => {
        if (userLoggedIn) {
          /*alert(
            `${userLoggedIn.get("firstName")}, you successfully logged in!`
          );*/
          const username = userLoggedIn.get("username");
          navigate(`/${username}/main`);
        }
        // TODO: redirect user to main app
        setAdd(false);
      })
      .catch((error) => {
        setError(`Error: ${error.message}`);
      });
    }
  }, [navigate, currentUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setCurrentUser({
      ...currentUser,
      [name]: newValue,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <Header />
      <h1 className="header-form">login</h1>
      <ErrorMessage message={error} />
      <AuthForm
        user={currentUser}
        isLogin={true}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <Footer />
    </div>
  );
};

export default AuthLogin;
