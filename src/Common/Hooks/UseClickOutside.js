import { useEffect } from "react";

const UseClickOutside = (ref, handleClickOutside) => {
  const ignoreNodes = ["BUTTON", "INPUT", "P"]; //  tag names that should be ignored 

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        const clickedNodeName = event.target.nodeName;
        if (!ignoreNodes.includes(clickedNodeName)) {
          handleClickOutside(event);
        }
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, handleClickOutside]);
};

export default UseClickOutside;
