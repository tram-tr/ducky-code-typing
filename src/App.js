import './App.css';
import React from "react";
import Components from "./Components/Components";
import Parse from "parse";

const serverURL = process.env.REACT_APP_PARSE_SERVER_URL;
const applicationId = process.env.REACT_APP_PARSE_APPLICATION_ID;
const javascriptKey = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;

Parse.serverURL = serverURL;
Parse.initialize(applicationId, javascriptKey);


function App() {
  return <Components />;
}

export default App;
