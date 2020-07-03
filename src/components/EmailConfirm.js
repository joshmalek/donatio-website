import React, { useState, useEffect, useRef } from "react";
import { useAnimation, motion } from "framer-motion";
import QueryString from "query-string";
import axios from "axios";

export default function EmailConfirm() {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const emailController = useAnimation();
  const passwordController = useAnimation();
  const completionAnimation = useAnimation();

  const [trueEmailValue, setTrueEmailValue] = useState(null);
  const [userId, setUserId] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    // Query the api to get the actual email value for the user
    // and the user_id. Store them in trueEmailValue and userId
    // respectively

    let parsed_params = QueryString.parse(window.location.search);
    console.log(parsed_params);
    // if there is no confiirmation string, leave the pave.
    // if the api returns null on confirmation string search, also leave the page.
    if (!parsed_params.confirm_key) {
      window.location.replace("/");
    }

    const confirm_query = `query { checkConfirmation(confirmation_key:"${parsed_params.confirm_key}") {email, _id, confirmation_string, email_confirmed}}`;
    console.log(`Confirm Query String Value`);
    console.log(confirm_query);

    axios
      .post("http://localhost:4000/graphql", {
        query: confirm_query,
      })
      .then((res) => {
        console.log(res);
        let user_data = res.data.data.checkConfirmation;

        if (user_data.email_confirmed) {
          window.location.replace("/?status=account_already_confirmed");
        }

        setTrueEmailValue(user_data.email);
        setUserId(user_data._id);
      })
      .catch((err) => {
        console.log(`Error recieved while checking confirmation string...`);
        console.log(err);
        // TODO redirect from page if an error is recieved.
      });
  }, []);

  useEffect(() => {
    if (emailValue) {
      // HERE: Check if the email set is the valid email
      console.log(`Confirm Email: ${emailValue}`);
      let email_valid = emailValue === trueEmailValue;

      if (email_valid) {
        // call the api and inform that the user has
        // confirmed their email successfully!
        const confirm_query = `mutation { setEmailConfirmed (user_id: "${userId}") }`;
        axios
          .post("http://localhost:4000/graphql", {
            query: confirm_query,
          })
          .then((res) => {
            console.log(`Confirm Email Response`);
            console.log(res);

            // hide the email container.
            emailController.start({
              top: "-20px",
              opacity: 0,
              transition: { duration: 1 },
            });
            passwordController.start({
              top: "50%",
              opacity: 1,
              transition: { duration: 1 },
            });
          })
          .catch((err) => {
            console.log(`Error setting email as confirmed...`);
            console.log(err);
          });
      }
    }
  }, [emailValue]);

  useEffect(() => {
    if (passwordValue) {
      // set password...
      const set_password_query = `mutation { setUserPassword(user_id: "${userId}", password: "${passwordValue}") }`;
      axios
        .post("http://localhost:4000/graphql", {
          query: set_password_query,
        })
        .then((res) => {
          console.log(`Password Set responded with:`);
          console.log(res);

          if (res.data.data.setUserPassword == true) {
            passwordController.start({
              top: "-20px",
              opacity: 0,
              transition: { duration: 1 },
            });
            completionAnimation.start({
              top: "50%",
              opacity: 1,
              transition: { duration: 1 },
            });
          }
        })
        .catch((err) => {
          console.log(`Error setting password`);
          console.log(err);
        });
    }
  }, [passwordValue]);

  return (
    <React.Fragment>
      <motion.div
        animate={emailController}
        className="email-confirm-field-container"
      >
        <EmailConfirmation
          email_invalid={emailValue != null && emailValue !== trueEmailValue}
          onConfirm={(email_value) => {
            setEmailValue(email_value);
          }}
        />
      </motion.div>
      <motion.div
        animate={passwordController}
        className="password-confirm-field-container"
      >
        <PasswordSet
          passwords_match={passwordsMatch}
          onConfirm={(password_, confirm_password) => {
            console.log(`${password_} == ${confirm_password}`);
            if (password_ === confirm_password) {
              setPasswordValue(password_);
            } else {
              setPasswordsMatch(false);
            }
          }}
        />
      </motion.div>
      <motion.div
        className="email-password-setup-completion"
        animate={completionAnimation}
      >
        <div className="password-confirm-center">
          <div
            style={{
              fontSize: "24px",
              fontWeight: 600,
              fontFamily: "Yan",
              marginBottom: "20px",
            }}
          >
            Account Setup Complete
          </div>
          <div>
            You have successfully confirmed your account and set your password.
            Download the Donatio mobile app to continue the Donatio experience!
          </div>
        </div>
      </motion.div>
    </React.Fragment>
  );
}

const PasswordSet = ({ onConfirm, passwords_match }) => {
  const pwdRef = useRef(null);
  const pwdConfirmRef = useRef(null);

  return (
    <div className="password-confirm-center">
      <div
        style={{
          fontSize: "20px",
          fontWeight: 600,
          marginBottom: "20px",
          fontFamily: "Yan",
        }}
      >
        Set Your Password
      </div>
      <div style={{ marginBottom: "15px" }}>
        Complete your account setup by creating a pasword for your account.
      </div>
      <div className="field-label">New Password</div>
      <input ref={pwdRef} className="donatio-input-field" />
      <div className="field-label">Confirm Password</div>
      <input ref={pwdConfirmRef} className="donatio-input-field" />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ color: "red", fontSize: "15px", flexGrow: 1 }}>
          {!passwords_match && "Passwords do not match"}
        </div>
        <div style={{ textAlign: "right" }}>
          <ActionButton
            value="Set Password"
            onclick={() => {
              if (onConfirm)
                onConfirm(pwdRef.current.value, pwdConfirmRef.current.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const EmailConfirmation = ({ onConfirm, email_invalid }) => {
  const emailRef = useRef(null);

  return (
    <div className="email-confirm-field">
      <div className="email-confirm-center">
        <div
          style={{
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "20px",
            fontFamily: "Yan",
          }}
        >
          Almost there...
        </div>
        <div style={{ fontSize: "20px", marginBottom: "20px" }}>
          You're almost done confirming your account! Enter your account email
          below to complete the confirmation.
        </div>
        <div className="field-label">Confirm Email</div>
        <input ref={emailRef} className="donatio-input-field" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ flexGrow: 1, color: "red", fontSize: "15px" }}>
            {email_invalid && "Invalid Email"}
          </div>
          <div>
            <ActionButton
              onclick={() => {
                if (onConfirm) onConfirm(emailRef.current.value);
              }}
              value="Confirm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ onclick, value }) => {
  return (
    <div
      onClick={() => {
        if (onclick) onclick();
      }}
      className="donatio-confirm-button"
    >
      {value}
    </div>
  );
};
