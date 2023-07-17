import { React, useState } from "react";
import useLocalStorage from "../../Common/Hooks/UseLocalStorage";
import TypingTestSection from "./TypingTestSection";

const TypingTestMain = () => {
    const [chosenLanguage, setChosenLanguage] = useLocalStorage("language", "js");
    return (
        <TypingTestSection
          chosenLanguage={chosenLanguage}
          setChosenLanguage={setChosenLanguage}
        />
      );
}

export default TypingTestMain;
