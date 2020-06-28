import React, { useEffect, useState } from "react";
import HtmlToReactParser from "html-to-react";
import AmazonPay from "amazon-pay-react";

const AmazonPayTest = () => {
  return (

    [billingAgreement, setBillingAgreement] = useState(null)

    <div>
      <AmazonPay
        clientId="amzn1.application-oa2-client.659d839c0bde45ec92f518eeec30cb96"
        sellerId="A2PNSD9U3NZBP4"
        agreementType={"BillingAgreement"}
        scope="profile payments:widget"
        btnType="PwA"
        btnColor="Gold"
        btnSize="medium"
        onConsentChange={(hasConsent) => {}}
        handleBillingAgreementId={(billingAgreementId) => {}}
        billingAgreementId={billingAgreement}
        useAmazonAddressBook={true}
        isSandbox
      />
    </div>
  );
};

const AmazonPayReturn = () => {
  return <div>Amazon Pay Return!</div>;
};

export { AmazonPayTest, AmazonPayReturn };

{
  /* <script
        async
        src="https://static-na.payments-amazon.com/OffAmazonPayments/us/sandbox/js/Widgets.js%22%3E"
      ></script>
      <div
        data-ap-widget-type="expressPaymentButton"
        data-ap-signature="9ic1gmWzYAO28xmBYBDLORVfGdXouD%2BoAc%2F2E7fFMgk%3D"
        data-ap-seller-id="A2PNSD9U3NZBP4"
        data-ap-access-key="AKIAJ5UW7IIODOHZSZKQ"
        data-ap-lwa-client-id="amzn1.application-oa2-client.659d839c0bde45ec92f518eeec30cb96"
        data-ap-return-url="http://donatio-site.herokuapp.com/amazonpay"
        data-ap-currency-code="USD"
        data-ap-amount="25"
        data-ap-note=""
        data-ap-shipping-address-required="false"
        data-ap-payment-action="Authorize"
      ></div> */
}
