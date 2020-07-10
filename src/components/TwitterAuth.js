import React, { useEffect } from "react";
import Twitter from "twitter-lite";
import axios from "axios";
import QueryString from "query-string";

const TwitterAuthCallback = () => {
  useEffect(() => {
    // process the oauth_token & oauth_verifier in the
    // url pararms.

    let parsed_params = QueryString.parse(window.location.search);

    if (!parsed_params.oauth_token || !parsed_params.oauth_verifier) {
      window.location.replace("/");
    }

    axios
      .post(process.env.REACT_APP_API_ROUTE, {
        query: `query { processTwitterAuth (oauth_token: "${parsed_params.oauth_token}", oauth_verifier: "${parsed_params.oauth_verifier}") }`,
      })
      .then((res) => {
        console.log(`Twitter API returned:`);
        console.log(res);
      })
      .catch((err) => {
        console.log(`Error making Twitter API call`);
        console.log(err);
      })
      .finally(() => {
        window.close();
      });
  }, []);

  return <div>Twitter auth callback!</div>;
};

const TwitterAuth = () => {
  useEffect(() => {}, []);

  return <div>Twitter Auth Setup!</div>;
};

export { TwitterAuth, TwitterAuthCallback };
