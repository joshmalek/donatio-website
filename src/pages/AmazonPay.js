import React, { useEffect, useState } from "react";
// import AmazonPay from "amazon-pay-react";
import QueryString from "query-string";

const AmazonPayReturn = () => {
  useEffect(() => {
    let parsed_params = QueryString.parse(window.location.search);
    console.log(`Return Params:`);
    console.log(parsed_params);
  }, []);

  return <div>Amazon Pay Return!</div>;
};

const AmazonPayInit = () => {
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

export { AmazonPayInit, AmazonPayReturn };
