import React, { useEffect } from "react";
import QueryString from "query-string";

const AmazonPayConfirmation = () => {
  useEffect(() => {
    let parsed_params = QueryString.parse(window.location.search);
    if (!parsed_params.success || !parsed_params.AuthenticationStatus) {
      window.location.replace("/");
    }
  }, []);

  return <div>Amazon Pay Confirmation!</div>;
};

export default AmazonPayConfirmation;
