import React, { useEffect, useState } from "react";
import HtmlToReactParser from "html-to-react";
// import AmazonPay from "amazon-pay-react";

const AmazonPayReturn = () => {
  return <div>Amazon Pay Return!</div>;
};

const AmazonPayTest = () => {
  useEffect(() => {
    // Setup Amazon Pay.

    window.showButton();
  }, []);

  return <div id="AmazonPayButton"></div>;
};

export { AmazonPayTest, AmazonPayReturn };
