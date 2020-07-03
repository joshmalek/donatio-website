import React, { useState, useEffect, useRef } from "react";
import { useAnimation, motion } from "framer-motion";
import QueryString from "query-string";

export default function EmailConfirm() {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const emailController = useAnimation();
  const passwordController = useAnimation();

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

    setTrueEmailValue("sample@gmail.com");
    setUserId("sample_user_id");
  }, []);

  useEffect(() => {
    if (emailValue) {
      // HERE: Check if the email set is the valid email
      console.log(`Confirm Email: ${emailValue}`);
      let email_valid = emailValue === trueEmailValue;

      if (email_valid) {
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
      }
    }
  }, [emailValue]);

  useEffect(() => {
    if (passwordValue) {
      // set password...
      passwordController.start({
        top: "-20px",
        opacity: 0,
        transition: { duration: 1 },
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
