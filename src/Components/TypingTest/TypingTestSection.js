import React, { useState, useRef, useEffect } from "react";
import Word from "./Word";
import UseClickOutside from "./UseClickOutside";
import UseLocalStorage from "./UseLocalStorage";
import UseTimer from "./UseTimer";
import { languages } from "./Selection";
import { getRandomWords } from "../../Common/Services/LanguageService";
import { createTypingTest } from "../../Common/Services/TypingTestService";
import { getFileExtbyType } from "../../Common/Services/FileExtService";
import "../../Common/Styles/TypingTest.css";

const TypingTestSection = ({ chosenLanguage, setChosenLanguage }) => {
  // State variables
  const [words, setWords] = useState("");
  const [typedWords, setTypedWords] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [typingStarted, setTypingStarted] = useState(false);
  const [seconds, setSeconds] = UseTimer(0, typingStarted);
  const [prevAccuracy, setPrevAccuracy] = UseLocalStorage("accuracy", null);
  const [prevWPM, setPrevWPM] = UseLocalStorage("wpm", null);
  const [isInputFocused, setIsInputFocused] = useState(true);
  const clickToContinueRef = useRef(null);

  // Ref for the dropdown menu
  const dropdownRef = useRef(null);
  UseClickOutside(dropdownRef, function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  });

  // Ref for the typing area
  const typingAreaRef = useRef(null);
  UseClickOutside(typingAreaRef, function handleClickOutside(event) {
    if (
      !clickToContinueRef.current && // check if "Click to continue" is not visible
      typingAreaRef.current &&
      !typingAreaRef.current.contains(event.target)
    ) {
      setIsInputFocused(false);
    }
  });

  // Function to calculate WPM and rawWPM
  const calculateWPM = (typedSentence, timeTakenInSeconds, accuracy) => {
    const charactersTyped = typedSentence.replace(/\s+/g, "").length;
    const wordsTyped = Math.ceil(charactersTyped / 5); // Assuming an average word length of 5 characters
    const rawWPM = (wordsTyped / (timeTakenInSeconds / 60)).toFixed(2);

    // calculate net WPM based on accuracy
    const netWPM = (rawWPM * accuracy).toFixed(2);

    return { rawWPM, netWPM };
  };

  // Function to calculate accuracy
  const calculateAccuracy = (typedSentence) => {
    const typedWordsArray = typedSentence.split(" ");
    const wordsArray = words.split(" ");
    let correctCharacters = 0;
    let totalCharacters = 0;
    wordsArray.forEach((word, index) => {
      const charactersInTypedWords = typedWordsArray[index].split("");
      const charactersInWords = word.split("");
      charactersInWords.forEach((character, index) => {
        totalCharacters++;
        if (charactersInTypedWords[index] === character) {
          correctCharacters++;
        }
      });
      if (charactersInTypedWords.length > charactersInWords.length) {
        totalCharacters +=
          charactersInTypedWords.length - charactersInWords.length;
      }
    });
    const accuracy = correctCharacters / totalCharacters;
    return accuracy.toFixed(2);
  };

  // Function to handle typing finished event
  const typingFinished = (typedSentence) => {
    const accuracy = calculateAccuracy(typedSentence);
    const timeTakenInSeconds = seconds;
    const { rawWPM, netWPM } = calculateWPM(
      typedSentence,
      timeTakenInSeconds,
      accuracy
    );

    // Get the current date and time
    const currentDateTime = new Date();

    // Save data to localStorage
    localStorage.setItem("accuracy", accuracy);
    localStorage.setItem("wpm", netWPM);

    // Fetch fileExtObjects based on selectedType
    getFileExtbyType(chosenLanguage)
      .then((fileExtObjects) => {
        const selectedFileExt =
          fileExtObjects.length > 0 ? fileExtObjects[0] : null;

        // Prepare data object to pass to createTypingTest function
        const typingTestData = {
          accuracy: parseFloat(accuracy),
          speed: parseFloat(netWPM),
          rawWPM: parseFloat(rawWPM),
          takenAt: currentDateTime,
          selectedType: selectedFileExt ? selectedFileExt.toPointer() : null,
        };

        // Call createTypingTest function and save data to Parse
        createTypingTest(typingTestData)
          .then((result) => {
            console.log("Typing test saved to Parse:", result);
          })
          .catch((error) => {
            console.error("Error saving typing test to Parse:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching FileExt objects from Parse:", error);
      });

    // Update state
    setPrevAccuracy(accuracy);
    setPrevWPM(netWPM);
    setTypingStarted(false);
    setSeconds(0);
    setTypedWords("");
    setToggle(!toggle);
  };

  // useEffect to fetch data when chosenLanguage or toggle changes
  useEffect(() => {
    localStorage.setItem("language", chosenLanguage);
    const fetchData = async () => {
      const selectedWords = await getRandomWords(chosenLanguage);
      if (selectedWords) {
        setWords(selectedWords);
        const typeBoxElement = window.document.getElementById("type-box");
        if (typeBoxElement) {
          typeBoxElement.focus();
          setIsInputFocused(true);
        }
      }
    };
    fetchData();
  }, [toggle, chosenLanguage]);

  // Show loading screen when words are not available yet
  if (words.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#1e1e1e",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <div id="preloader">
          <div id="loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        overflow: "scroll",
      }}
    >
      <div
        style={{
          maxWidth: "7xl",
          width: "100vw",
          height: "100vh",
          display: "flex",
          padding: "6px",
          alignItems: "center",
          justifyContent: "around",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "60%",
            top: "-25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            maxWidth: "5xl",
            padding: "4px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "inline-flex", flexDirection: "row" }}>
              <p
                style={{
                  color: "#f6f6f6",
                  margin: "1px",
                  marginBottom: "4px",
                  fontSize: "16px",
                }}
              >{`${typedWords.split(" ").length - 1}/${
                words.split(" ").length
              }`}</p>
              <p
                style={{
                  color: "#ffd801",
                  margin: "1px",
                  fontSize: "16px",
                  marginLeft: "8px",
                }}
              >
                {seconds}
              </p>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffd801",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              zIndex: "40",
            }}
          >
            <p
              onClick={() =>
                isInputFocused && setIsDropdownOpen(!isDropdownOpen)
              }
            >
              {chosenLanguage}
            </p>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "8px",
                  backgroundColor: "#2e2e2e",
                  borderRadius: "4px",
                  height: "auto",
                  right: "-17px",
                  boxSizing: "content-box",
                }}
              >
                {languages.map((language) => (
                  <p
                    key={language}
                    style={{
                      fontSize: "16px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      padding: "8px",
                      backgroundColor:
                        chosenLanguage === language ? "#ffd801" : "transparent",
                      color:
                        chosenLanguage === language ? "#2e2e2e" : "#ffd801",
                    }}
                    onClick={() => {
                      setWords("");
                      setTypedWords("");
                      setChosenLanguage(language);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {language}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div
          ref={typingAreaRef}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column", // Stack words vertically
            alignItems: "center", // Center words horizontally
            padding: "4px",
            maxWidth: "5xl",
          }}
          onClick={() => {
            window.document.getElementById("type-box").focus();
            setIsInputFocused(true);
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "4px",
              maxWidth: "5xl",
              lineHeight: "1.5",
              width: "60%",
            }}
          >
            {words.split(" ").map((word, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span style={{ margin: "0 4px" }}>&nbsp;</span>}
                <Word
                  actualWord={word}
                  wordTyped={typedWords.split(" ")[index]}
                  isLastTypedWord={index === typedWords.split(" ").length - 1}
                />
              </React.Fragment>
            ))}
          </div>
          {!isInputFocused && (
            <div
              ref={clickToContinueRef}
              style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1e1e1e",
                border: "1px solid #ffd801",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                margin: "50px",
                padding: "100px",
              }}
            >
              <p style={{ color: "#ffd801", marginBottom: "10px" }}>
                Click here to continue
              </p>
            </div>
          )}
        </div>
        <input
          id="type-box"
          style={{
            position: "fixed",
            top: "-100px",
            background: "transparent",
            color: "transparent",
            outline: "none",
            border: "none",
          }}
          onChange={(e) => {
            if (typingStarted === false && e.target.value.length > 0) {
              setTypingStarted(true);
            }
            setTypedWords(e.target.value);
            if (
              e.target.value.split(" ").length > words.split(" ").length ||
              (e.target.value.split(" ").length === words.split(" ").length &&
                e.target.value.split(" ")[e.target.value.split(" ").length - 1]
                  .length ===
                  words.split(" ")[words.split(" ").length - 1].length)
            ) {
              typingFinished(e.target.value);
            }
          }}
          value={typedWords}
          autoFocus
        />
        <div
          /*style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "evenly",
            flexDirection: "column",
            sm: { flexDirection: "row" },
            maxWidth: "5xl",
          }}*/
          className="under-typing-test-section"
        >
          <button
            className="refreshButton"
            onClick={() => {
              setTypedWords("");
              setSeconds(0);
              setTypingStarted(false);
              setToggle(!toggle);
            }}
          >
            Refresh
          </button>
          <div className="typing-test-real-time-data">
            {prevAccuracy !== null && (
              <p className="typing-test-stats">
                {`Latest Accuracy: ${prevAccuracy * 100}%`}
              </p>
            )}
            {prevWPM !== null && (
              <p className="typing-test-stats">{`Latest WPM: ${prevWPM}`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingTestSection;
