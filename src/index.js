import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AmazonPayTest, AmazonPayReturn } from "./pages/AmazonPay";

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
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/amazonPayTest">
            <AmazonPayTest />
          </Route>
          <Route path="/amazonpay">
            <AmazonPayReturn />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<DonatioApp />, document.getElementById("root"));

// AmazonPay

window.onAmazonLoginReady = function () {
  amazon.Login.setClientId(
    "amzn1.application-oa2-client.659d839c0bde45ec92f518eeec30cb96"
  );
};
window.onAmazonPaymentsReady = function () {
  window.showButton = function () {
    var authRequest;

    OffAmazonPayments.Button(
      "AmazonPayButton",
      "A2PNSD9U3NZBP4", // Seller ID
      {
        type: "PwA",
        color: "Gold",
        size: "medium",
        authorization: function () {
          loginOptions = {
            scope: "profile payments:widget",
            popup: true,
          };
          authRequest = amazon.Login.authorize(
            loginOptions,
            "%PUBLIC_URL%/pay-with-amazon"
          );
        },
        onError: function (error) {
          console.log(error.toString());
        },
      }
    );
  };
};

document.getElementById("Logout").onclick = function () {
  amazon.Login.logout();
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
