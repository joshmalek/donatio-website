import React, { useEffect, useState } from "react";
// import AmazonPay from "amazon-pay-react";
import QueryString from "query-string";

const AmazonPayReturn = () => {
  const [addressBookLoaded, setAddressBookLoaded] = useState(false);

  useEffect(() => {
    let parsed_params = QueryString.parse(window.location.search);
    console.log(`Return Params:`);
    console.log(parsed_params);

    // call the address book api
    setTimeout(() => {
      if (!addressBookLoaded) {
        let result_ = window.showAddressBook((order_ref_id) => {
          // load the wallet.
          window.showWallet(order_ref_id);
        });
        if (result_) setAddressBookLoaded(true);
      }
    }, 1500);
  }, []);

  return (
    <div>
      <div id="addressBookWidgetDiv" className="amazonCheckoutWidget"></div>
      <div id="walletWidgetDiv" className="amazonCheckoutWidget"></div>
    </div>
  );
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
