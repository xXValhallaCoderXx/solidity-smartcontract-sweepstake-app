import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./root-routes";
import reportWebVitals from "./reportWebVitals";
import { Grommet } from "grommet";
import { grommet } from "grommet/themes";

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={grommet}>
      <HashRouter>
        <App />
      </HashRouter>
    </Grommet>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
