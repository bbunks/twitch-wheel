import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import App from "./src/App";

ReactDOM.render(
    React.createElement(App, {}, null),
    document.getElementById("root")
);
