import React from "react";

const PrivacyPolicy = () => {
  const redirectToPrivacy = () => {
    // redirect to https://www.termsfeed.com/live/b8e63459-9039-4118-9fa9-fe7b6d376494
    window.location.replace(
      "https://www.termsfeed.com/live/b8e63459-9039-4118-9fa9-fe7b6d376494"
    );
  };
  return <div>{redirectToPrivacy()}</div>;
};

export default PrivacyPolicy;
