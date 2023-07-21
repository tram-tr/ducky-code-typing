import React, { useEffect, useState } from "react";
import { getAllTypingTestsByCurrentUser } from "../../Common/Services/TypingTestService";
import { getUser } from "../../Common/Services/AuthService";
import LineChart from "./LineChart";
import { getSelectedLanguage } from "../../Common/Services/LanguageService";

const DashBoard = () => {
  const [typingTests, setTypingTests] = useState([]);
  const [languageData, setLanguageData] = useState({});

  const username = getUser().get("username");

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

  useEffect(() => {
    // Only fetch language data when typingTests have been loaded
    if (typingTests.length > 0) {
      const fileExtObjs = typingTests.map((test) => test.get("selectedType"));
      const languagePromises = Promise.all(
        fileExtObjs.map((fileExt) => getSelectedLanguage(fileExt))
      );

      async function getSelectedLanguageData() {
        try {
          const languageObjs = await languagePromises;
          const selectedLanguages = languageObjs.map((languageObj) =>
            languageObj[0].get("name")
          );

          // Create a dictionary to store data for each language
          const languageData = selectedLanguages.reduce(
            (dataDict, language, index) => {
              if (!dataDict[language]) {
                dataDict[language] = {
                  count: 0,
                  totalWPM: 0,
                  totalAccuracy: 0,
                };
              }

              // Calculate the total WPM and accuracy for each language
              dataDict[language].count += 1;
              dataDict[language].totalWPM += typingTests[index].get("speed");
              dataDict[language].totalAccuracy +=
                typingTests[index].get("accuracy") * 100;

              return dataDict;
            },
            {}
          );

          // Calculate the average WPM and accuracy for each language
          for (const language in languageData) {
            languageData[language].averageWPM =
              languageData[language].totalWPM / languageData[language].count;
            languageData[language].averageAccuracy =
              languageData[language].totalAccuracy /
              languageData[language].count;
          }

          setLanguageData(languageData);
        } catch (error) {
          console.error("Error fetching selected language data:", error);
        }
      }

      getSelectedLanguageData();
    }
  }, [typingTests]);

  const dateTakenData = typingTests.map((test) => {
    const date = test.get("takenAt");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  });
  const accuracyData = typingTests.map((test) => test.get("accuracy") * 100);
  const speedData = typingTests.map((test) => test.get("speed"));
  const fileExtObjs = typingTests.map((test) => test.get("selectedType"));
  const languagePromises = Promise.all(
    fileExtObjs.map((fileExt) => getSelectedLanguage(fileExt))
  );

  return (
    <div className="dashboard">
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        {username}'s Code Typing Performance
      </h2>
      <div
        className="typing-test-charts"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginLeft: "15px", marginRight: "15px"}}
      >
        <div
          className="chart-wrapper"
          style={{ flex: 1, minWidth: "400px", margin: "10px" }}
        >
          <div className="accuracy-chart">
            <LineChart
              rawData={accuracyData}
              dataLabels={dateTakenData}
              chartTitle={"Accuracy by Test"}
              pointLabel={"accuracy (%)"}
              selectionLabel={"# of Typing Test"}
            />
          </div>
        </div>
        <div
          className="chart-wrapper"
          style={{ flex: 1, minWidth: "400px", margin: "10px" }}
        >
          <div className="speed-chart">
            <LineChart
              rawData={speedData}
              dataLabels={dateTakenData}
              chartTitle={"Speed (WPM) by Test"}
              pointLabel={"wpm"}
              selectionLabel={"# of Typing Test"}
            />
          </div>
        </div>
        <div
          className="chart-wrapper"
          style={{ flex: 1, minWidth: "400px", margin: "10px" }}
        >
          <div className="avg-accuracy-chart">
            <LineChart
              rawData={Object.values(languageData).map(
                (data) => data.averageAccuracy
              )}
              dataLabels={Object.keys(languageData)}
              chartTitle={"Average Accuracy by Language"}
              pointLabel={"accuracy (%)"}
              selectionLabel={"# of Coding Languages"}
            />
          </div>
        </div>
        <div
          className="chart-wrapper"
          style={{ flex: 1, minWidth: "400px", margin: "10px" }}
        >
          <div className="avg-speed-chart">
            <LineChart
              rawData={Object.values(languageData).map(
                (data) => data.averageWPM
              )}
              dataLabels={Object.keys(languageData)}
              chartTitle={"Average Speed (WPM) by Language"}
              pointLabel={"wpm"}
              selectionLabel={"# of Coding Languages"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
