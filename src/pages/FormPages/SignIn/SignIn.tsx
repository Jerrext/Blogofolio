import React, { useContext, useEffect, useMemo, useState } from "react";
import styles from "./SignIn.module.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";
import { Theme, useThemeContext } from "../../../context/Theme/Context";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { signInUser } from "../../../redux/reducers/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  const { theme } = useThemeContext();

  useEffect(() => {
    if (email.length === 0) {
      setEmailError("Email is required field");
    } else if (!reg.test(email)) {
      setEmailError("Enter a valid email");
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const isValid = useMemo(() => {
    return emailError.length === 0 && passwordError.length === 0;
  }, [emailError, passwordError]);

  const emailOnChange = (value: string) => {
    setEmail(value);
  };

  const passwordOnChange = (value: string) => {
    setPassword(value);
  };

  const signInOnClick = () => {
    dispatch(
      signInUser({
        data: { email, password },
        callback: () => navigate(RoutesList.Home),
      })
    );
  };

  return (
    <FormPage titleFormPage="Sign In">
      <div className={styles.inputsWrapper}>
        <Input
          title="Email"
          placeholder="Your email"
          inputType="email"
          errText={emailError}
          onChange={emailOnChange}
        />
        <div className={styles.passwordWrapper}>
          <Input
            title="Password"
            placeholder="Your password"
            inputType="password"
            errText={passwordError}
            onChange={passwordOnChange}
          />
          <NavLink
            to={RoutesList.ResetPassword}
            className={classNames(styles.forgotPass, {
              [styles.darkForgotPass]: theme === Theme.Dark,
            })}
          >
            Forgot password?
          </NavLink>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            title={"Sign In"}
            type={ButtonType.Primary}
            disabled={!isValid}
            onClick={signInOnClick}
          />
          <div>
            Don’t have an account?{" "}
            <NavLink to={RoutesList.SignUp} className={styles.signUpLink}>
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </FormPage>
  );
};

export default SignIn;
