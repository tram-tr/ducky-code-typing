import axios from "axios";

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

