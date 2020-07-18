import React from "react";
import Logo from "../assets/svg/logo.svg";
import GithubSVG from "../assets/svg/github.svg";
import Feature1PNG from "../misc/imgs/feature_1.png"
import Feature2PNG from "../misc/imgs/feature_2.png"
import Feature3PNG from "../misc/imgs/feature_3.png"
import Feature4SVG from "../misc/svg/RotateCharity.svg"
import Feature5PNG from "../misc/imgs/feature_5.png"

import "../devlog.css";

const DevlogNavbar = () => {
  return (
    <div className="dev-log-navbar">
      <div className="left-side">
        <a href="/">
          <div
            className="dev-log-logo-area"
            style={{
              background: `url(${Logo})`,
              display: "inline-block",
              verticalAlign: "top"
            }}
          ></div>
        </a>
        <div style={{ display: "inline-block", verticalAlign: "top", lineHeight: "30px", marginLeft: "10px" }}>
          Donatio / Features
        </div>
      </div>
      <div className="right-side"><a href="/features"></a></div>
    </div>
  );
};

const DevlogSubheader = () => {
  return (
    <div className="devlog-subheader">
      Amazon RaiseUp Hackathon Entry / July 14, 2020
    </div>
  );
};

const ImageParagraph = ({ title, contents, image, imageWidth, left, subcontent }) => {
  return <React.Fragment>
      <div className="devlog-image-paragraph">
      {left != null && <div className="left-side">
          <div className="image-center-div" style={{width: `${imageWidth}px`}}><img src={image} width="100%" /></div>
      </div>}
      <div className="right-side">
            {title != null && <div className="devlog-title">{title}</div>}
          <div>{contents}</div>
      </div>
      {left == null && <div className="left-side">
          <div className="image-center-div" style={{float: "right", width: `${imageWidth}px`}}>
            <img src={image} width="100%" />
          </div>
      </div>}
  </div>
  <div className="devlog-subcontent-container">{subcontent != null && subcontent}</div>
  </React.Fragment>;
};

const AboutTheDev = ({ name, github }) => {
  return (
    <div className="about-the-devs">
      <div style={{ fontFamily: "Asap", width: "200px", marginRight: "30px" }}>
        {name}
      </div>
      <div>
        <div
          style={{
            width: "30px",
            height: "30px",
            background: `url(${GithubSVG})`,
            backgroundSize: "100%",
            display: "inline-block",
            verticalAlign: "top",
          }}
        ></div>
        <div
          style={{
            display: "inline-block",
            verticalAlign: "top",
            marginLeft: "20px",
          }}
        >
          <a
            className="subtle-link"
            href={`https://github.com/${github}`}
            target="_blank"
          >
            @{github}
          </a>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="devlog-container">
      <DevlogNavbar />
      <DevlogSubheader />
      <ImageParagraph
        image={Feature1PNG}
        imageWidth={300}
        title="Donatio Widget at Checkout"
        contents={`With the Donatio browser extension enabled, the Donatio widget will appear at certain checkouts. This widget will allow you to donate a portion of your checkout total to a charity.`}
      />
      <ImageParagraph
        image={Feature2PNG}
        imageWidth={350}
        left
        title="Process your Donation with Amazon Pay"
        contents={`Use your Amazon account to process your donation with Amazon Pay.`}
      />
      <ImageParagraph
        image={Feature3PNG}
        imageWidth={300}
        title="Gain Levels and Unlock Medals"
        contents={`As you donate, you will unlock lots of cool medals and gain experience that will count towards the next level.`}
        subcontent="The more you donate, the more points you earn! After each week, the users with the most points on the global leaderboard will be awarded with the more medals to add to their collection!"
      />
      <ImageParagraph
        image={Feature4SVG}
        imageWidth={100}
        left
        title="Different Charity Each Day"
        contents={`We rotate the charity of the day each day to diversify the support users provide amongst a plethora of small and large charities.`}
      />
      <ImageParagraph
        image={Feature5PNG}
        imageWidth={150}
        left
        contents={`With the Twitter API, you can share your recent donation with Twitter by Authorizing yout Twitter account.`}
      />

      <div style={{fontSize: "14px", fontFamily: "OpenSans", marginBottom: "60px"}}>Manage your medals and see your weekly leaderboard ranking through our mobile app!</div>

      <div style={{ fontFamily: "Asap", fontSize: "18px" }}>Developers</div>
      <AboutTheDev name={"Abdul-Muiz Yusuff"} github={"sacrael"} />
      <AboutTheDev name={"Josh Malek"} github={"joshmalek"} />
    </div>
  );
};

export default Features;
