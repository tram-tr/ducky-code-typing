import React from "react";
import Character from "./Character";

function getColor(index, wordTyped, actualWord) {
  if (index < wordTyped.length && index < actualWord.length) {
    if (wordTyped[index] === actualWord[index]) {
      return "#ffd801"; // main
    }
  } else if (index < actualWord.length && index >= wordTyped.length) {
    return "#f6f6f6"; 
  }
  return "#ff0128"; // error
}

function Word(props) {
  const { wordTyped, actualWord, isLastTypedWord } = props;

  if (wordTyped === undefined) {
    return (
      <div style={{ marginRight: "2px", whiteSpace: "pre" }}>
        {actualWord.split("").map((char, index) => {
          return <Character key={index} char={char} color={"#f6f6f6"} />;
        })}
      </div>
    );
  }

  return (
    <div style={{ marginRight: "2px", whiteSpace: "pre" }}>
      {actualWord.split("").map((char, index) => {
        return (
          <Character
            key={index}
            char={char}
            color={getColor(index, wordTyped, actualWord)}
            isLastTypedCharacter={
              isLastTypedWord && index === wordTyped.length - 1
            }
            isStartOfNewWord={
              isLastTypedWord && wordTyped.length === 0 && index === 0
            }
          />
        );
      })}
      {wordTyped.length > actualWord.length &&
        wordTyped.split("").map((char, index) => {
          if (index >= actualWord.length) {
            return (
              <Character
                key={index}
                char={char}
                color={getColor(index, wordTyped, actualWord)}
                isLastTypedCharacter={
                  isLastTypedWord && index === wordTyped.length - 1
                }
              />
            );
          }
        })}
    </div>
  );
}

export default Word;
