import Parse from "parse";

// READ operation - by type
export const getFileExtbyType = (selectedType) => {
  const FileExt = Parse.Object.extend("FileExt");
  const query = new Parse.Query(FileExt);
  query.equalTo("type", selectedType); // filter by selected type

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
