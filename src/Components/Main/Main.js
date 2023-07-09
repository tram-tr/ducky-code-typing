import React from "react";
import NavBar from "../NavBar/NavBar";

/* STATEFUL PARENT COMPONENT */
const MainModule = () => {
  // Variables in the state to hold data

  return (
    <div>
      <NavBar />
      <hr />
      This is the main parent component.
      {/* Stateless Child component passing up events from form */}
    </div>
  );
};

export default MainModule;
