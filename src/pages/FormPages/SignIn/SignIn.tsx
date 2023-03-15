import React from "react";
import styles from "./SignIn.module.scss";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";

const SignIn = () => {
  const emailOnChange = () => {};

  const passwordOnChange = () => {};

  return (
    <FormPage titleFormPage="Sign In">
      <div className={styles.inputsWrapper}>
        <Input
          title="Email"
          placeholder="Your email"
          onChange={emailOnChange}
        />
        <div className={styles.passwordWrapper}>
          <Input
            title="Password"
            placeholder="Your password"
            onChange={passwordOnChange}
          />
          <div className={styles.forgotPass}>Forgot password?</div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            title={"Sign In"}
            type={ButtonType.Primary}
            onClick={() => {}}
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
