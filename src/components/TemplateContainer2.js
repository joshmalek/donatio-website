import React from "react";
import Navbar from "./Navbar";

const TemplateContainer2 = ({ children }) => {
  return (
    <div className="donatio-container-two">
      <div className="donatio-center-padd">
        <Navbar />
        <div className="body-contents">{children}</div>
      </div>
    </div>
  );
};

export default TemplateContainer2;
