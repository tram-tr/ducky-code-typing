import React, { useState, useRef, useEffect } from "react";
import Word from "./Word";
import UseClickOutside from "../../Common/Hooks/UseClickOutside";
import UseLocalStorage from "../../Common/Hooks/UseLocalStorage";
import UseTimer from "../../Common/Hooks/UseTimer";
import { languages, wordLengths } from "./Selection";
import "../../Common/Styles/TypingTest.css";

const TypingTestSection = ({
  chosenLanguage,
  setChosenLanguage,
}) => {
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

  const dropdownRef = useRef(null);
  UseClickOutside(dropdownRef, function handleClickOutside(event) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  });

  const typingAreaRef = useRef(null);
  UseClickOutside(typingAreaRef, function handleClickOutside(event) {
    if (
      !clickToContinueRef.current && // Check if "Click to continue" is not visible
      typingAreaRef.current &&
      !typingAreaRef.current.contains(event.target)
    ) {
      setIsInputFocused(false);
    }
  });

  const calculateWPM = () => {
    const wordsPerMinute =
      (typedWords.split(" ").filter((word) => {
        return word.length > 0;
      }).length /
        seconds) *
      60;
    return wordsPerMinute.toFixed(2);
  };

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

  const typingFinished = (typedSentence) => {
    const accuracy = calculateAccuracy(typedSentence);
    const wpm = calculateWPM();
    localStorage.setItem("accuracy", accuracy);
    localStorage.setItem("wpm", wpm);
    setPrevAccuracy(accuracy);
    setPrevWPM(wpm);
    setTypingStarted(false);
    setSeconds(0);
    setTypedWords("");
    setToggle(!toggle);
  };

  useEffect(() => {
    localStorage.setItem("language", chosenLanguage);
    fetch(
      `https://siddheshkothadi.github.io/APIData/language-keywords/${chosenLanguage}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        let selectedWords = [];

        while (selectedWords.length < 30) {
          let random = Math.floor(Math.random() * data.words.length);
          if (!selectedWords.includes(data.words[random])) {
            selectedWords.push(data.words[random].word);
          }
        }
        setWords(selectedWords.join(" "));
        window.document.getElementById("type-box").focus();
        setIsInputFocused(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle, chosenLanguage]);

  if (words.length === 0) {
    return (
      <div
        style={{
          backgroundColor: "#1b1d36",
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

  const splitWordsIntoRows = () => {
    const wordsArray = words.split(" ");
    const rows = [];
    const wordsPerRow = 10; // Adjust this value to control the number of words per row

    for (let i = 0; i < wordsArray.length; i += wordsPerRow) {
      rows.push(wordsArray.slice(i, i + wordsPerRow).join(" "));
    }

    return rows;
  };

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
            width: "100%",
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
                  color: "#99d6ea",
                  margin: "1px",
                  marginBottom: "4px",
                  fontSize: "12px",
                }}
              >{`${typedWords.split(" ").length - 1}/${
                words.split(" ").length
              }`}</p>
              <p
                style={{
                  color: "#fca6d1",
                  margin: "1px",
                  fontSize: "12px",
                  marginLeft: "8px",
                }}
              >
                {seconds}
              </p>
            </div>
          </div>
          <div style={{ position: "relative", color: "#fca6d1", fontSize: "16px", cursor: "pointer", fontWeight: "bold", zIndex: "40" }}>
            <p onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {chosenLanguage}
            </p>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  top: "8px",
                  backgroundColor: "#1b1d36",
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
                      color: "#fca6d1",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      padding: "8px",
                      backgroundColor: chosenLanguage === language ? "#99d6ea" : "transparent",
                      color: chosenLanguage === language ? "#1b1d36" : "#99d6ea",
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
          {splitWordsIntoRows().map((row, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              {row.split(" ").map((word, wordIndex) => (
                <React.Fragment key={wordIndex}>
                  {wordIndex > 0 && <span style={{ margin: "0 4px" }}>&nbsp;</span>}
                  <Word
                    actualWord={word}
                    wordTyped={typedWords.split(" ")[index * 10 + wordIndex]}
                    isLastTypedWord={
                      index * 10 + wordIndex === typedWords.split(" ").length - 1
                    }
                  />
                </React.Fragment>
              ))}
            </div>
          ))}
          {!isInputFocused && (
            <div
              ref={clickToContinueRef}
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                right: "0",
                bottom: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                margin: "10px",
              }}
            >
              <p style={{ color: "#fca6d1", marginBottom: "10px" }}>
                Click to continue
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
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "evenly", flexDirection: "column", sm: { flexDirection: "row" }, maxWidth: "5xl" }}>
          <button
            style={{
              color: "#fca6d1",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
              padding: "3px",
              borderRadius: "4px",
              outline: "none",
              border: "none",
              backgroundColor: "transparent",
            }}
            onClick={() => {
              setTypedWords("");
              setSeconds(0);
              setTypingStarted(false);
              setToggle(!toggle);
            }}
          >
            Refresh
          </button>
          {prevAccuracy !== null && (
            <p style={{ color: "#99d6ea", margin: "1px", fontSize: "12px", fontWeight: "bold" }}>
              {`acc: ${prevAccuracy * 100}%`}
            </p>
          )}
          {prevWPM !== null && (
            <p style={{ color: "#99d6ea", margin: "1px", fontSize: "12px", fontWeight: "bold" }}>{`wpm: ${prevWPM}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingTestSection;
