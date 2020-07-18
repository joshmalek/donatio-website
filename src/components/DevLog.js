import React from "react";
import Logo from "../assets/svg/logo.svg";
import GithubSVG from "../assets/svg/github.svg";

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
          Donatio / Development Log
        </div>
      </div>
      <div className="right-side"><a href="/features">Next: Features</a></div>
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

const Paragraph = ({ contents }) => {
  return <div className="devlog-paragraph">{contents}</div>;
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

const DevLog = () => {
  return (
    <div className="devlog-container">
      <DevlogNavbar />
      <DevlogSubheader />
      <Paragraph
        contents={`Hello, I am Abdul-Muiz, one of the two developers on the Project Donatio. During these hard times we are facing, many nonprofit organizations find it hard to carry out their mission and provide services to their communities. So we began this project thinking about how we could ease their workload by streamlining their tasks and therefore being able to accomplish more in their day. Hence, we spent our first week surveying about 100 nonprofit organizations to gain insight on tasks they would normally need to get done and which tasks they found increasingly harder to complete due to the complications emanated by from the pandemic we are currently facing.`}
      />
      <Paragraph
        contents={`Unable to get responses from our surveys, we had already lost a week in development time and concluded that, due to our lack of insight on the operations of nonprofit organizations, we would need to brainstorm a more general, all-encompassing idea that could still provide value to nonprofit organizations. Thus, we began looking into possible ideas that would provide nonprofit organizations with capital, because as we all know, money solves problems.`}
      />
      <Paragraph
        contents={`After hours of brainstorming, we began playing around the idea of being able to donate money each time you checkout. By no means did we think we had stumbled upon a new concept. As a matter of fact, many online stores occasionally provide the option to donate some amount of money to charity at checkout. But we wanted to add a spin to this idea. What if we were able to gamify this concept. Each donation you make at checkout through Donatio would give you rewards and accolades that you could then use to flex to all your friends. We went along with it as it seemed like an interesting idea.`}
      />
      <Paragraph
        contents={`Now it was time to think about the implementation of this idea. How would we give the option to customers, checking out products on any website, to donate a portion of their checkout total to a charity? We would need a way to insert elements into websites that we do not host. Luckily, browser extensions provide this exact functionionality. If we create an extension, we can target certain websites, search through the DOM of any page, and insert any HTML element we want, ultimately being able to add functionality to already existing sites. So, we created the Donation Web Extension, which inserts a blurb at the top of a checkout page, parses the checkout total on the purchase, and, if the customer chooses so, they can click the “Donate” button inserted by our extension and donate a percent of their checkout total to the Charity of the Day, which is rotated around daily. For time purposes, we only implemented and tested this with Amazon checkout purchases (US only). We process the donations through Amazon Pay, and once the transaction is complete, the customer is directed to a new tab that shows the awards they earned from donating and the experience they gained towards the next level, like in a video game. The customer can also authorize their Twitter account to tell the world about their recent donation and rewards they earned through Donatio. At the end of each day, our Donatio Twitter account tweets how much money was donated to the Charity of the Day. We decided upon doing a Charity of the Day format, rather than a charity of the customers choice because we wanted to distribute the support each charity received. This way, even smaller charities with less support would get equal attention as the bigger nonprofit organizations and charities.`}
      />
      <Paragraph
        contents={`Next, we needed a way to display the user’s stats, and their rankings compared to other Donatio users. We could choose between making a website for this purpose or a mobile application. In order to make this hackathon as much of a learning experience as possible, we chose to make a mobile app through Flutter, since we both had plenty of experience making web applications and not enough making mobile applications. So, we created a mobile application for Donatio that, once the user logged in, they could see their unlocked medals, locked medals, level, experience, weekly donations and weekly rankings in the global leaderboard. The way the user would be able to login is, once they make their first donation through the web extension, the amazon account they processed their Amazon Pay account through would create a new user with the same email. They will then be prompted to confirm their email after their first donation is finished processing. And from there, they can set their password for the new account and login into the mobile application.`}
      />

      <div style={{ fontFamily: "Asap", fontSize: "18px" }}>Developers</div>
      <AboutTheDev name={"Abdul-Muiz Yusuff"} github={"sacrael"} />
      <AboutTheDev name={"Josh Malek"} github={"joshmalek"} />
    </div>
  );
};

export default DevLog;
