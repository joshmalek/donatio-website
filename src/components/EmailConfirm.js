import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { useAnimation, motion } from "framer-motion";

export default function EmailConfirm() {
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const emailController = useAnimation();
  const passwordController = useAnimation();

  useEffect(() => {
    if (emailValue) {
      // HERE: Check if the email set is the valid email
      console.log(`Confirm Email: ${emailValue}`);
      let email_valid = true;

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
          onConfirm={(password_, confirm_password) => {
            console.log(`${password_} == ${confirm_password}`);
            if (password_ === confirm_password) {
              setPasswordValue(password_);
            }
          }}
        />
      </motion.div>
    </React.Fragment>
  );
}

const PasswordSet = ({ onConfirm }) => {
  const pwdRef = useRef(null);
  const pwdConfirmRef = useRef(null);

  return (
    <div className="password-confirm-center">
      <div style={{ marginBottom: "15px" }}>Set pasword for your account</div>
      <div className="field-label">New Password</div>
      <input ref={pwdRef} className="donatio-input-field" />
      <div className="field-label">Confirm Password</div>
      <input ref={pwdConfirmRef} className="donatio-input-field" />
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
  );
};

const EmailConfirmation = ({ onConfirm }) => {
  const emailRef = useRef(null);

  return (
    <div className="email-confirm-field">
      <div className="email-confirm-center">
        <div className="field-label">Confirm Email</div>
        <input ref={emailRef} className="donatio-input-field" />
        <div style={{ textAlign: "right" }}>
          <ActionButton
            onclick={() => {
              if (onConfirm) onConfirm(emailRef.current.value);
            }}
            value="Confirm"
          />
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
