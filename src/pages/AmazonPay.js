import React, { useEffect, useState } from "react";
// import AmazonPay from "amazon-pay-react";
import QueryString from "query-string";
import axios from "axios";

const AmazonPayReturn = () => {
  const [orderId, setOrderId] = useState(null);
  const [addressBookLoaded, setAddressBookLoaded] = useState(false);

  const completeOrder = () => {
    console.log(`Order Complete initiated.`);
    console.log(`Order ID: ${orderId}`);
    let query_string = `mutation { processAmazonPay( donation_amount: ${10.0}, currency_code: "USD", order_reference_id: "${orderId}" ) { total_donation } }`;

    axios
      .post("http://localhost:4000/graphql", {
        query: query_string,
      })
      .then((res) => {
        console.log(`amazonPay API Response:`);
        console.log(res);
      })
      .catch((err) => {
        console.log(`amazonPay API Error:`);
        console.log(err);
      });
  };

  useEffect(() => {
    let parsed_params = QueryString.parse(window.location.search);
    console.log(`Return Params:`);
    console.log(parsed_params);

    // call the address book api
    setTimeout(() => {
      if (!addressBookLoaded) {
        let result_ = window.showAddressBook((order_ref_id) => {
          // load the wallet.
          window.showWallet(order_ref_id, (_) => {
            setOrderId(order_ref_id);
          });
        });
        if (result_) setAddressBookLoaded(true);
      }
    }, 1500);
  }, []);

  return (
    <div>
      <div id="addressBookWidgetDiv" className="amazonCheckoutWidget"></div>
      <div id="walletWidgetDiv" className="amazonCheckoutWidget"></div>
      <div
        className="parallel-btn"
        onClick={() => {
          if (orderId != null) {
            completeOrder();
          }
        }}
      >
        <div className="btn-text">Place Order</div>
      </div>
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
