import React, { useEffect, useState } from "react";
// import AmazonPay from "amazon-pay-react";
import QueryString from "query-string";
import axios from "axios";

const AmazonPayReturn = () => {
  const [orderId, setOrderId] = useState(null);
  const [addressBookLoaded, setAddressBookLoaded] = useState(false);

  const completeOrder = () => {
    let donation_amount = localStorage.getItem("donation_amount");
    console.log(`Doonation Amount:`);
    console.log(donation_amount);
    let query_string = `mutation { processAmazonPay( donation_amount: \${parseFloat(
      donation_amount
    )}, currency_code: "USD", order_reference_id: "${orderId}" ) { success, reciept_id } }`;
    // localStorage.removeItem("donation_amount");

    console.log(`Query String:`);
    console.log(query_string);

    window.placeAmazonPayOrder(orderId, (confirmationFlow) => {
      axios
        .post("http://localhost:4000/graphql", {
          query: query_string,
        })
        .then((res) => {
          console.log(`amazonPay API Response:`);
          console.log(res);

          if (res.data.data.processAmazonPay.success) {
            // set session key
            localStorage.setItem(
              "donation_reciept",
              res.data.data.processAmazonPay.reciept_id
            );

            confirmationFlow.success();
          } else {
            confirmationFlow.error();
          }
        })
        .catch((err) => {
          console.log(`amazonPay API Error:`);
          console.log(err);
          confirmationFlow.error();
        });
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
        style={{ marginTop: "20px" }}
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

  const [donationPrice, setDonationPrice] = useState(0);
  const [charityName, setCharityName] = useState("");

  useEffect(() => {
    // Parse URL Params for the donation price and charity name
    let parsed_params = QueryString.parse(window.location.search);
    console.log(parsed_params);
    if (parsed_params.amount && parsed_params.npo_name) {
      setCharityName(parsed_params.npo_name);
      setDonationPrice(parseFloat(parsed_params.amount).toFixed(2));
      // setDonationPrice(parsed_params.amount.toFixed(2));
      localStorage.setItem(
        "donation_amount",
        parseFloat(parsed_params.amount).toFixed(2)
      );
    } else {
      // if the required parameters are not present, just exit the tab.
      console.log(`Should close tab...`);
      window.location.replace("/");
    }

    // Setup Amazon Pay.
    setTimeout(() => {
      if (!buttonLoaded) {
        let result_ = window.showButton();
        if (result_) setButtonLoaded(true);
      }
    }, 1500);
  }, []);

  return (
    <div>
      <div className="donate-prompt-pay">
        Donate <span style={{ color: "#52ECBD" }}>${donationPrice}</span> to{" "}
        {charityName}?
      </div>
      <div
        id="AmazonPayButton"
        style={{ width: "200px", margin: "0 auto" }}
      ></div>
    </div>
  );
};

export { AmazonPayInit, AmazonPayReturn };
