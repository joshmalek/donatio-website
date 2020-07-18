import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AmazonPayConfirmation from "./pages/AmazonPayConfirmation";
import TemplateContainer2 from "./components/TemplateContainer2";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { AmazonPayInit, AmazonPayReturn } from "./pages/AmazonPay";
import { TwitterAuthCallback, TwitterAuth } from "./components/TwitterAuth";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./misc/css/style.css";
import EmailConfirm from "./components/EmailConfirm";
import LandingPage from "./components/landing_page/LandingPage";
import DevLog from "./components/DevLog";
import Features from "./components/Features"

require("dotenv").config();

const Contact = () => {
  return <div>TODO: Contact</div>;
};

const DonatioApp = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/devlog">
            <DevLog />
          </Route>
          <Route path="/features">
            <Features />
          </Route>
          <Route path="/twitterAuth">
            <TemplateContainer2>
              <TwitterAuth />
            </TemplateContainer2>
          </Route>
          <Route path="/twitter">
            <TemplateContainer2>
              <TwitterAuthCallback />
            </TemplateContainer2>
          </Route>
          <Route path="/privacy">
            <PrivacyPolicy />
          </Route>
          <Route path="/contact">
            <TemplateContainer2>
              <Contact />
            </TemplateContainer2>
          </Route>
          <Route path="/amazonPay">
            <TemplateContainer2>
              <AmazonPayInit />
            </TemplateContainer2>
          </Route>
          <Route path="/amazonPayReturn">
            <TemplateContainer2>
              <AmazonPayReturn />
            </TemplateContainer2>
          </Route>
          <Route path="/paymentStatus">
            <TemplateContainer2>
              <AmazonPayConfirmation />
            </TemplateContainer2>
          </Route>
          <Route path="/confirm">
            <TemplateContainer2>
              <EmailConfirm />
            </TemplateContainer2>
          </Route>
          <Route path="/">
            <LandingPage />
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
