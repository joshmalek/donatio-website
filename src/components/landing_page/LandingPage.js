import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import TrackVisibility from "react-on-screen";
import * as Scroll from "react-scroll"
import axios from "axios";
import "../../App.css";

import Logo from "../../assets/svg/logo.svg";
import AmazonIcon from "../../assets/svg/amazon-pay.svg";

import AmnestyIntl from "../../assets/nonprofit_logos/amnesty-international.png";
import MakeAWish from "../../assets/nonprofit_logos/make-a-wish.png";
import RedCross from "../../assets/nonprofit_logos/red-cross.png";
import SalvationArmy from "../../assets/nonprofit_logos/salvation-army.png";
import StJude from "../../assets/nonprofit_logos/st-jude.png";
import Unicef from "../../assets/nonprofit_logos/unicef.png";
import UnitedWay from "../../assets/nonprofit_logos/united-way.png";

import EarnMedalsSVG from "../../assets/svg/earn_medals.svg";
import ClimbLeaderboardSVG from "../../assets/svg/trophies.svg";
import GainExperienceSVG from "../../assets/svg/experience_bar.svg";
import TrophyPNG from "../../misc/imgs/trophy-small.png"
import TrophySVG from "../../misc/svg/award.svg"
import SupportSVG from "../../misc/svg/support.svg"

const ParallelButton = ({ text, onclick, bgColor, textColor, marginRight }) => {
  return (
    <div
      className="parallel-button"
      onClick={() => {
        if (onclick) onclick();
      }}
      style={{
        backgroundColor: bgColor == null ? "#202020" : bgColor,
        marginRight: marginRight == null ? 0 : marginRight,
      }}
    >
      <div
        className="parallel-button-text"
        style={{
          color: textColor == null ? "white" : textColor,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const IntroArea = () => {
  return (
    <div className="intro-area">
      <div className="landing-content">
        <div className="navbar-area">
          <div className="logo-area">
            <a href="/">
              <div className="logo-container">
                <img src={Logo} width="100%" height="100%" />
              </div>
              <div className="logo-text-container">DONATIO</div>
            </a>
          </div>
          <div classNa me="navbar-actions">
            <a className="navbar-link" style={{ cursor: "pointer" }} onClick={() => {
              Scroll.animateScroll.scrollTo(1800);
            }}>
              How It Works
            </a>
            <a href="/devlog" className="navbar-link">
              Dev Log
            </a>
            <ParallelButton text="Try It" onclick={() => {
              Scroll.animateScroll.scrollToBottom();
            }} />
          </div>
        </div>

        <div className="landing-first-prompt">
          <div
            className="left-area"
            style={{ paddingTop: "100px", paddingBottom: "40px" }}
          >
            <div style={{ maxWidth: "600px" }}>
              <div className="landing-title">
                Aid Charities Around the World
              </div>
              <div className="landing-paragraph" style={{ color: "white" }}>
                Help causes nationwide by seamlessly donating a portion of your
                online purchase to a good cause.
              </div>
              <div
                style={{
                  marginLeft: "25px",
                  marginTop: "40px",
                  marginBottom: "60px",
                }}
              >
                <ParallelButton text="Try It" onclick={() => {
                  Scroll.animateScroll.scrollToBottom();
                }} />
              </div>
            </div>
          </div>
          <div className="right-area">
            <img src={SupportSVG} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ParagraphWithPicture = ({
  header,
  paragraph,
  image,
  imageWidth,
  imageHeight,
  icons,
  imageLocation,
  iframe,
}) => {
  const ImageContainer = () => {
    if (iframe != null) {
      return (
        <div
          className="picture-area"
          style={{ width: `${imageWidth}px`, height: `${imageHeight}px` }}
        >
          {iframe}
        </div>
      );
    }
    return (
      <div
        className="picture-area"
        style={{ width: `${imageWidth}px`, height: `${imageHeight}px`, background: `url(${image})` }}
      >
        {/* <img src={image} width="100%" height="100%" /> */}
      </div>
    );
  };

  const IconsContainer = () => {
    let icons_list = [];
    if (icons != null) {
      for (var i = 0; i < icons.length; ++i) {
        icons_list.push(
          <div className="icon-container" key={i}>
            <img src={icons[i]} height="100%" />
          </div>
        );
      }
    }
    return icons_list;
  };

  return (
    <div className="paragraph-with-pic">
      {(imageLocation == null || imageLocation == "left") && ImageContainer()}
      <div className="paragraph-container">
        <div className="paragraph-text-holder-center">
          <div className="landing-title">{header}</div>
          <div className="landing-paragraph">{paragraph}</div>
          <div className="paragraph-with-pic-icons">{IconsContainer()}</div>
        </div>
      </div>
      {imageLocation == "right" && ImageContainer()}
    </div>
  );
};

const CharitySlider = ({ charities }) => {
  const [charityIndex, setCharityIndex] = useState(0);
  const charitySliderAnimator = useAnimation();
  const firstCharityAnimator = useAnimation();
  const sliderTimer = 1500;

  const updateCharitySlider = async () => {
    // setCharityIndex((charityIndex + 1) % charities.length);
    await charitySliderAnimator.start({
      transform: `translate(-${
        getWidth(charities[charityIndex][1]) + 80
        }px, 0px)`,
      transition: { duration: 1 },
    });
    firstCharityAnimator.start({
      width: "0px",
      marginRight: "0px",
      transition: { duration: 0.5 },
    });
    await charitySliderAnimator.start({
      transform: `translate(0px, 0px)`,
      marginRight: "0px",
      transition: { duration: 0.5 },
    });
    setCharityIndex((charityIndex + 1) % charities.length);
    // charitySliderAnimator.set({ transform: `translate(0px, 0px)` });
  };

  useEffect(() => {
    setTimeout(() => {
      updateCharitySlider();
    }, sliderTimer);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateCharitySlider();
    }, sliderTimer);
  }, [charityIndex]);

  const getWidth = (old_width) => {
    return 80.0 * (old_width / 150);
  };

  const getSliderWidth = () => {
    if (charities == null || typeof charities != typeof []) return "0px";
    let width_ = 0;
    for (var i = 0; i < charities.length; ++i) {
      width_ += getWidth(charities[i][1]) + 80;
    }
    return `${width_}px`;
  };

  const CharityImageHolders = () => {
    if (charities == null || typeof charities != typeof []) return [];
    let charity_holders = [];
    for (var i = charityIndex; i < charities.length; ++i) {
      if (i == charityIndex) {
        charity_holders.push(
          <motion.div
            key={i}
            animate={firstCharityAnimator}
            className="charity-holder"
            style={{ width: `${getWidth(charities[i][1])}px` }}
          >
            <img src={charities[i][0]} width="100%" height="100%" />
          </motion.div>
        );
      } else {
        charity_holders.push(
          <div
            key={i}
            className="charity-holder"
            style={{
              width: `${getWidth(charities[i][1])}px`,
              marginRight: "80px",
            }}
          >
            <img src={charities[i][0]} width="100%" height="100%" />
          </div>
        );
      }
    }
    for (var i = 0; i < charityIndex; ++i) {
      charity_holders.push(
        <div
          key={i}
          className="charity-holder"
          style={{
            width: `${getWidth(charities[i][1])}px`,
            marginRight: "80px",
          }}
        >
          <img src={charities[i][0]} width="100%" height="100%" />
        </div>
      );
    }

    return charity_holders;
  };

  return (
    <div className="charity-slider">
      <div className="landing-title" style={{ textAlign: "center" }}>
        Some Charities We Support
        <div className="charity-slider-frame">
          <motion.div
            animate={charitySliderAnimator}
            className="charity-slider-slider"
            style={{ width: getSliderWidth() }}
          >
            {CharityImageHolders()}
          </motion.div>
        </div>
      </div>
      <div
        className="landing-paragraph"
        style={{ textAlign: "center", marginTop: "35px" }}
      >
        ... and many more
      </div>
    </div>
  );
};

const ParallelTitle = ({ title }) => {
  return (
    <div className="parallel-title">
      <div className="text-area">{title}</div>
      <div className="parallel-bg"></div>
    </div>
  );
};

const GettingStarted = () => {
  return (
    <div>
      <div className="landing-title">Getting Started</div>
      <div style={{ marginLeft: "30px", marginTop: "30px" }}>
        <ParallelTitle title="Download the Extension" />
        <div className="landing-paragraph" style={{ marginBottom: "70px" }}>
          Download the extension here and add it to your browser. The extension
          currently supports only Google Chrome. Firefox extension will be
          coming soon.
        </div>
        <ParallelButton text="Download for Google Chrome" marginRight="30px" />
        <ParallelButton
          text="Mozilla Firefox (coming soon)"
          bgColor="#8F8F8F"
        />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="landing-footer">
      <div className="landing-content footer-holder">
        <div className="left-side">
          <div
            style={{
              width: "40px",
              height: "40px",
              marginRight: "30px",
              display: "inline-block",
            }}
          >
            <img src={Logo} />
          </div>
          <div className="logo-text-container">DONATIO</div>
        </div>
        <div className="right-side" style={{ paddingTop: "20px" }}>
          <ParallelButton
            text="Back to Top"
            bgColor="white"
            textColor="#202020"
            onclick={() => {
              Scroll.animateScroll.scrollToTop();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const DisplayModals = () => {
  const earnMedalsAnimator = useAnimation();
  const gainLevelsAnimtor = useAnimation();
  const climbLeaderboardAnimator = useAnimation();

  return (
    <div className="display-modals">
      <div className="display-modals-section">
        <div className="modals-section-center">
          <TrackVisibility>
            {({ isVisible }) =>
              isVisible && (
                <motion.div
                  className="modal-tranitioned"
                  animate={earnMedalsAnimator}
                >
                  <div
                    onLoad={() => {
                      earnMedalsAnimator.start({
                        marginTop: "0px",
                        opacity: 1,
                        transition: { duration: 1.5 },
                      });
                    }}
                    style={{
                      width: "62.13px",
                      height: "78.05px",
                      marginBottom: "30px",
                    }}
                  >
                    <img src={EarnMedalsSVG} width="100%" height="100%" />
                  </div>
                  <ParallelTitle title="Earn Medals" />
                  <div className="landing-paragraph">
                    Each time you donate to a charity, you gain progress to
                    unlocking different medals to add to your collection.
                  </div>
                </motion.div>
              )
            }
          </TrackVisibility>
        </div>
      </div>
      <div className="display-modals-section">
        <div className="modals-section-center">
          <TrackVisibility>
            {({ isVisible }) =>
              isVisible && (
                <motion.div
                  className="modal-tranitioned"
                  animate={gainLevelsAnimtor}
                  onLoad={() => {
                    setTimeout(() => {
                      gainLevelsAnimtor.start({
                        marginTop: "0px",
                        opacity: 1,
                        transition: { duration: 1.5 },
                      });
                    }, 500);
                  }}
                >
                  <ParallelTitle title="Gain Levels" />
                  <div className="landing-paragraph">
                    You will gain experience for each donation you make and gain
                    levels once enough experience has been acquired.
                  </div>
                  <div
                    style={{
                      width: "232.24px",
                      height: "40.67px",
                      marginTop: "50px",
                    }}
                  >
                    <img src={GainExperienceSVG} width="100%" height="100%" />
                  </div>
                </motion.div>
              )
            }
          </TrackVisibility>
        </div>
      </div>
      <div className="display-modals-section">
        <div className="modals-section-center">
          <TrackVisibility>
            {({ isVisible }) =>
              isVisible && (
                <motion.div
                  className="modal-tranitioned"
                  animate={climbLeaderboardAnimator}
                  onLoad={() => {
                    setTimeout(() => {
                      climbLeaderboardAnimator.start({
                        marginTop: "0px",
                        opacity: 1,
                        transition: { duration: 1.5 },
                      });
                    }, 1000);
                  }}
                >
                  <div
                    style={{ width: "76px", height: "76.5px" }}
                    className="trophies-climb-leader"
                  >
                    <img src={ClimbLeaderboardSVG} width="100%" height="100%" />
                  </div>
                  <ParallelTitle title="Climb the Leaderboard" />
                  <div className="landing-paragraph">
                    Rank on a global leaderboard amongst all donators on the
                    platform. Increase your rank score for each achievement you
                    acquire and level you gain.
                  </div>
                </motion.div>
              )
            }
          </TrackVisibility>
        </div>
      </div>
    </div>
  );
};

const DisplayCharityOfDay = () => {

  const [npo, setNpo] = useState("")

  useEffect(() => {
    axios.post("https://3.130.4.139/graphql", {
      query: "{ NPOofDay { name, _id } }",
    })
    .then(res => {
      console.log(`NPO of Day response`);
      console.log(res);
      setNpo(res.data.data.NPOofDay.name);
    })
    .catch(err => {
      console.log(`Error getting charity of the day.`);
      console.log(err);
    })
  }, [])

  return (<div style={{
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Asap",
    fontWeight: "600",

  }}>
   <div style={{display: "inline-block",
    fontSize: "22px"}}>
    Today's Nonprofit of the Day is
   </div>
   <div style={{display: "inline-block", 
   border: "1px solid rgba(0, 0, 0, 0.6)", 
   padding: "10px 5px",
   borderRadius: "3px"
   }}>
    {npo}
  </div> </div>)
}

function LandingPage() {
  return (
    <div>
      <IntroArea />
      <div className="landing-content">
        <DisplayCharityOfDay />
        <ParagraphWithPicture
          image={TrophySVG}
          imageWidth="332"
          imageHeight="596"
          header="Gamified Donation Platform"
          paragraph="Donatio provides a platform by which users acquire 
          medals, points and levels for every donation they make!"
          imageLocation="left"
        />
        <DisplayModals />
        <ParagraphWithPicture
          iframe={<iframe width="720" height="405" src="https://www.youtube.com/embed/3AH7IBOZYLM?rel=0&modestbranding=1&controls=0&autoplay=1&mute=1&loop=1&playlist=3AH7IBOZYLM&autohide=1&showinfo=0&controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>}
          imageWidth="720px"
          imageHeight="405px"
          header="Donatio Web Extension"
          paragraph="With our web extension and the power of
          Amazon Pay, you can donate a percentage of your purchases
          to the Charity of the Day."
          imageLocation="left"
          icons={[AmazonIcon]}
        />
        <ParagraphWithPicture
          image="https://via.placeholder.com/377x656"
          imageWidth="375px"
          imageHeight="812px"
          header="Donatio Mobile App"
          paragraph="And with our mobile app, keep track of your donations, your
          unlocked medals, and your rankings on the global leaderboard.
          
          Join in on this truly interactive experience and support charities in
          serving their mission."
          imageLocation="right"
          iframe={
            <iframe
              width="375"
              height="812"
              src="https://xd.adobe.com/embed/54c7f3d4-f966-4d98-6c90-c282a1441c5f-22f6/"
              frameborder="0"
              allowfullscreen
            ></iframe>
          }
        />
        <CharitySlider
          charities={[
            [AmnestyIntl, 351],
            [MakeAWish, 564],
            [RedCross, 418],
            [StJude, 166],
            [SalvationArmy, 148],
            [Unicef, 548],
            [UnitedWay, 344],
          ]}
        />
        <div style={{ marginTop: "200px", marginBottom: "200px" }}>
          <GettingStarted />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LandingPage;
