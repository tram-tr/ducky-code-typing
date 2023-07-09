import React, { useEffect, useState } from "react";
import {
  checkUser,
  createUser,
  getUser,
} from "../../Common/Services/AuthService";
import AuthForm from "./AuthForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import "../../Common/Styles/AuthForm.css";

const AuthRegister = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verifyPassword: ""
  });

  // flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [error, setError] = useState("");

  // redirect already authenticated users back to home
  useEffect(() => {
    if (checkUser()) {
      //alert("You are already logged in");
      const username = getUser().get("username");
      navigate(`/${username}/main`);
    }
  }, [navigate]);

  // useEffect that run when changes are made to the state variable flags
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser, setError).then((userCreated) => {
        if (userCreated) {
          /*alert(
            `${userCreated.get("firstName")}, you successfully registered!`
          );*/
          const username = userCreated.get("username");
          navigate(`/${username}/main`);
        }
        // TODO: redirect user to main app
        setAdd(false);
      }).catch((error) => {
        setError(`Error: ${error.message}`);
      });
    }
  }, [navigate, newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value: newValue } = e.target;
    console.log(newValue);

    setNewUser({
      ...newUser,
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
      <h1 className="header-form">register</h1>
      <ErrorMessage message={error} />
      <AuthForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <Footer />
    </div>
  );
};

export default AuthRegister;
