import { useState, useEffect } from "react";

function UseTimer(initialTime, toggle = true) {
  const [seconds, setSeconds] = useState(initialTime);

  useEffect(() => {
    let interval = null;

    if (toggle === true) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [toggle]);

  return [seconds, setSeconds];
}

export default UseTimer;
