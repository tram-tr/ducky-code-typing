import { useState, useEffect } from "react";

function UseLocalStorage(key, defaultValue) {
  const [chosenValue, setChosenValue] = useState(defaultValue);

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      setChosenValue(value);
    }
  }, []);

  return [chosenValue, setChosenValue];
}

export default UseLocalStorage;