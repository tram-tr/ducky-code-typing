import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import DashBoard from "./DashBoard";

const MainModule = () => {
  // Variables in the state to hold data

  return (
    <div>
      <NavBar />
      <DashBoard />
      {/* Stateless Child component passing up events from form */}
      <Footer />
    </div>
  );
};

export default MainModule;
