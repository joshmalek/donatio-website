import React from "react";
import Logo from "../misc/svg/logo.svg";

const Navbar = ({ logoOnly }) => {
  return (
    <div className="donatio-navbar">
      <div className="navbar-left">
        <div className="logo-box">
          <img src={Logo} width="80%" height="80%" />
        </div>
        <div className="logo-text" style={{ color: "#000000" }}>
          DONATIO
        </div>
      </div>
      {!logoOnly & <div className="navbar-right"></div>}
    </div>
  );
};

export default Navbar;
