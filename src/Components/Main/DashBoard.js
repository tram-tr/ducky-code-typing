import React, { useEffect, useState } from "react";
import { getAllTypingTestsByCurrentUser } from "../../Common/Services/TypingTestService";

const DashBoard = () => {
  const [typingTests, setTypingTests] = useState([]);

  useEffect(() => {
    fetchTypingTests();
  }, []);

  const fetchTypingTests = async () => {
    try {
      const tests = await getAllTypingTestsByCurrentUser();
      setTypingTests(tests);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>My Typing Tests</h2>
      {typingTests.length > 0 ? (
        <ul>
          {typingTests.map((test) => (
            <li key={test.id}>
              Accuracy: {test.get("accuracy")}, Speed: {test.get("speed")}, Date Taken: {test.get("takenAt").toString()}, Selected Type: {test.get("selectedType").id}
            </li>
          ))}
        </ul>
      ) : (
        <p>No typing tests available.</p>
      )}
    </div>
  );
};

export default DashBoard;
