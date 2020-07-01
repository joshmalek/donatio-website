import Rect from "react";
import Navbar from "./Navbar";

const TemplateContainer2 = ({ children }) => {
  return (
    <div className="donatio-container-two">
      <Navbar />
      <div className="body-contents">{children}</div>
    </div>
  );
};

export default TemplateContainer2;
