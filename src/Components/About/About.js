import React from "react";
import "../../Common/Styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>about</h2>
      <ul>
        duckytype
        <li>a personal and school project (u of notre dame, cse 40693 modern web development, summer 2023)</li>
        <li>
          a code-typing platform designed to help coders improve their typing
          skills
        </li>
        <li>
          focused on minimalism, a clean and distraction-free typing
          interface
        </li>
        <li>inspired by the popular typing platform MonkeyType</li>
        <li className="funfact">(fun fact 0: psyduck is my favorite pokemon!)</li>
        <li className="funfact">(fun fact 1: there is also a terminal-based version of duckytype written in C but it's still in the debugging phase...)</li>
      </ul>
      <ul>
        stats
        <li>wpm: words per min, total characters in correctly typed words divided by 5 and normalized to 60 seconds</li>
        <li>raw wpm: includes both correct and incorrect words in the calculation</li>
        <li>accuracy: percentage of correctly pressed keys</li>
        <li>char ratio: ratio of correct characters to incorrect characters.</li>
        <li>consistency: measures typing consistency based on the variance of raw wpm.</li>
      </ul>
    </div>
  );
};

export default About;