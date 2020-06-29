import React, { useEffect, useState } from "react";
import HtmlToReactParser from "html-to-react";
// import AmazonPay from "amazon-pay-react";

const AmazonPayReturn = () => {
  return <div>Amazon Pay Return!</div>;
};

const AmazonPayTest = () => {
  const [buttonLoaded, setButtonLoaded] = useState(false);

  useEffect(() => {
    // Setup Amazon Pay.
    setTimeout(() => {
      if (!buttonLoaded) {
        let result_ = window.showButton();
        if (result_) setButtonLoaded(true);
      }
    }, 1500);
  }, []);

  return <div id="AmazonPayButton"></div>;
};

export { AmazonPayTest, AmazonPayReturn };
