import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.scss";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { ButtonType } from "../../../utils/@globalTypes";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";
import Input from "../../../components/Input";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  useEffect(() => {
    if (email.length === 0) {
      setEmailError("Email is required field");
    } else if (!reg.test(email)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }
  }, [email]);

  const onHomeBtnClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <FormPage titleFormPage="Reset password">
      <div className={styles.resetPassWrapper}>
        <p>
          You will receive an email{" "}
          <span className={styles.resetPassText}>example@gmail.com</span> with a
          link to reset your password!
        </p>
        <Input
          value={email}
          title="Email"
          placeholder="Your email"
          inputType="email"
          errText={emailError}
          onChange={setEmail}
        />
      </div>
      <Button
        title={"Go to home"}
        type={ButtonType.Primary}
        onClick={onHomeBtnClick}
      />
    </FormPage>
  );
};

export default ResetPassword;
