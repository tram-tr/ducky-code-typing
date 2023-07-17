import React from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import useLocalStorage from "./UseLocalStorage";
import TypingTestSection from "./TypingTestSection";

const TypingTestMain = () => {
  const [chosenLanguage, setChosenLanguage] = useLocalStorage("language", "js");
  return (
    <div>
      <NavBar />
      <TypingTestSection
        chosenLanguage={chosenLanguage}
        setChosenLanguage={setChosenLanguage}
      />
      <Footer />
    </div>
  );
};

export default TypingTestMain;
