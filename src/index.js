import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { TwitterAuthCallback, TwitterAuth } from "./components/TwitterAuth";

import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Contact = () => {
  return <div>TODO: Contact</div>;
};

const DonatioApp = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/twitterAuth">
            <TwitterAuth />
          </Route>
          <Route path="/twitter">
            <TwitterAuthCallback />
          </Route>
          <Route path="/">
            <App />
          </Route>
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<DonatioApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
