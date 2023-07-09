import Parse from "parse";

// CREATE operation
export const createTypingTest = (data) => {
  const typingTest = new Parse.Object("TypingTest");
  typingTest.set("accuracy", data.accuracy);
  typingTest.set("speed", data.speed);
  typingTest.set("takenAt", data.takenAt);
  typingTest.set("takenBy", Parse.User.current());
  typingTest.set("selectedType", data.selectedType);

  return typingTest.save().then((result) => {
    // returns the newly created TypingTest object
    return result;
  });
};

// READ operation - by id
export const getTypingTestById = (id) => {
  const TypingTest = Parse.Object.extend("ypingTest");
  const query = new Parse.Query(TypingTest);
  return query.get(id).then((result) => {
    // return TypingTest object with objectId: id
    return result;
  });
};

// READ operation - by current user
export const getAllTypingTestsByCurrentUser = () => {
  const TypingTest = Parse.Object.extend("TypingTest");
  const query = new Parse.Query(TypingTest);
  const currentUser = Parse.User.current();

  query.equalTo("takenBy", currentUser); // filter by current user

  return query.find().then((results) => {
    // return an array of TypingTest objects
    return results;
  });
};

// READ operation - by current user and selected type
export const getTypingTestsByCurrentUserAndType = (selectedType) => {
  const TypingTest = Parse.Object.extend("TypingTest");
  const query = new Parse.Query(TypingTest);
  const currentUser = Parse.User.current();

  query.equalTo("user", currentUser); // filter by current user
  query.equalTo("type", selectedType); // filter by selected type

  return query.find().then((results) => {
    // return an array of TypingTest objects
    return results;
  });
};
