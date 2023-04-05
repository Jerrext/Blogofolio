import React, { useEffect, useMemo, useState } from "react";
import styles from "./SignUp.module.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { NavLink, useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../../redux/reducers/authSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  useEffect(() => {
    if (username.length === 0) {
      setNameError("Name is required field");
    } else {
      setNameError("");
    }
  }, [username]);

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
    if (password !== confirmPassword) {
      setPasswordError("Passwords must match");
    } else if (password.length === 0 || confirmPassword.length === 0) {
      setPasswordError("Password is required field");
    } else {
      setPasswordError("");
    }
  }, [confirmPassword, password]);

  const isValid = useMemo(() => {
    return (
      nameError.length === 0 &&
      emailError.length === 0 &&
      passwordError.length === 0
    );
  }, [nameError, emailError, passwordError]);

  // Используем, если не надо показывать никаких ошибок пользователю
  // const isValid = useMemo(() => {
  //   return (
  //     username.length > 0 &&
  //     email.length > 0 &&
  //     password.length > 0 &&
  //     confirmPassword.length > 0 &&
  //     password === confirmPassword
  //   );
  // }, [username, email, password, confirmPassword]);

  const onSignUpClick = () => {
    // Валидация на кнопку
    // if (username.length === 0) {
    //   setNameError("Name is required field");
    // } else {
    //   setNameError("");
    // }

    // if (email.length === 0) {
    //   setEmailError("Email is required field");
    // } else {
    //   setEmailError("");
    // }

    // if (password !== confirmPassword) {
    //   setPasswordError("Passwords must match");
    // } else if (password.length === 0 || confirmPassword.length === 0) {
    //   setPasswordError("Password is required field");
    // } else {
    //   setPasswordError("");
    // }

    // !isValid &&
    dispatch(
      signUpUser({
        data: { username, email, password },
        callback: () => navigate(RoutesList.SignIn),
      })
    );
  };

  return (
    <FormPage titleFormPage="Sign Up">
      <div className={styles.inputsWrapper}>
        <Input
          value={username}
          title="Name"
          placeholder="Your name"
          inputType="text"
          errText={nameError}
          onChange={setUsername}
        />
        <Input
          value={email}
          title="Email"
          placeholder="Your email"
          inputType="email"
          errText={emailError}
          onChange={setEmail}
        />
        <Input
          value={password}
          title="Password"
          placeholder="Your password"
          inputType="password"
          errText={passwordError}
          onChange={setPassword}
        />
        <Input
          value={confirmPassword}
          title="Confirm password"
          placeholder="Confirm password"
          inputType="password"
          errText={passwordError}
          onChange={setConfirmPassword}
        />
        <div className={styles.buttonWrapper}>
          <Button
            title={"Sign Up"}
            type={ButtonType.Primary}
            onClick={onSignUpClick}
            disabled={!isValid}
          />
          <div>
            Already have an account?{" "}
            <NavLink to={RoutesList.SignIn} className={styles.signUpLink}>
              Sign In
            </NavLink>
          </div>
        </div>
      </div>
    </FormPage>
  );
};

export default SignUp;
