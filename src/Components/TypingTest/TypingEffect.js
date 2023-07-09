import React, { useEffect, useState } from "react";

const TypingEffect = ({ text }) => {
    const [typedText, setTypedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
  
    useEffect(() => {
      const typingTimer = setInterval(() => {
        if (currentIndex === text.length) {
          clearInterval(typingTimer);
          setTimeout(() => {
            setShowCursor(false);
            setTimeout(() => {
              setTypedText("");
              setCurrentIndex(0);
              setShowCursor(true);
            }, 500);
          }, 1000);
        } else {
          setTypedText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }
      }, 100);
  
      return () => {
        clearInterval(typingTimer);
      };
    }, [text, currentIndex]);
  
    return (
      <p>
        {typedText}
        {showCursor && "_"}
      </p>
    );
};
  
export default TypingEffect;
  