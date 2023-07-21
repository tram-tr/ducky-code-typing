import axios from "axios";
import Parse from "parse";

export const getRandomWords = async (chosenLanguage) => {
  try {
    const response = await axios.get(
      `https://siddheshkothadi.github.io/APIData/language-keywords/${chosenLanguage}.json`
    );

    let selectedWords = [];

    while (selectedWords.length < 30) {
      let random = Math.floor(Math.random() * response.data.words.length);
      if (!selectedWords.includes(response.data.words[random])) {
        selectedWords.push(response.data.words[random].word);
      }
    }

    const words = selectedWords.join(" ");
    return words;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
};

export const getSelectedLanguage = (fileExt) => {
  const Language = Parse.Object.extend("Language");
  const query = new Parse.Query(Language);
  query.equalTo("fileExt", fileExt);

  return query.find()
    .then((results) => {
      // return an array of FileExt objects
      return results;
    })
    .catch((error) => {
      console.error("Error fetching data from Parse:", error);
      return []; // Return an empty array or handle the error as needed
    });
};
