import Parse from "parse";

// used in auth register component
export const createUser = (newUser, setError) => {
  const { username, firstName, lastName, password, email, verifyPassword } =
    newUser;

  if (password !== verifyPassword) {
    //alert("Passwords do not match");
    setError("Error: Passwords do not match.");
    return Promise.resolve();
  } else {
    const user = new Parse.User();

    user.set("username", username);
    user.set("firstName", firstName);
    user.set("lastName", lastName);
    user.set("password", password);
    user.set("email", email);

    console.log("User: ", user);
    return user
      .signUp()
      .then((newUserSaved) => {
        return newUserSaved;
      })
      /*.catch((error) => {
        alert(`Error: ${error.message}`);
      })*/;
  }
};

// used in auth login component
export const loginUser = (currUser) => {
  const user = new Parse.User();

  user.set("password", currUser.password);
  user.set("username", currUser.username);

  console.log("User: ", user);
  console.log();
  return user
    .logIn(user.username, user.password)
    .then((currUserSaved) => {
      return currUserSaved;
    })
    /*.catch((error) => {
      alert(`Error here: ${error.message}`);
    })*/;
};

// used to check authentication
export const checkUser = () => {
  return Parse.User.current()?.authenticated;
};

// used to get current user
export const getUser = () => {
  const currentUser = Parse.User.current();
  return currentUser?.authenticated ? currentUser : null;
};

// used in navbar component to logout
export const logoutUser = (navigate) => {
  return Parse.User.logOut()
    .then(() => {
      console.log("User logged out successfully");
    })
    .then(() => {
      navigate("/");
    })
    /*.catch((error) => {
      alert(`Error: ${error.message}`);
    });*/
};
