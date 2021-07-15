import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import MainApp from "./MainApp";
import "../node_modules/font-awesome/css/font-awesome.min.css";

ReactDOM.render(<MainApp />, document.getElementById("root"));
serviceWorker.register();
