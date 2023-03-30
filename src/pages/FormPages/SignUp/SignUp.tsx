import React from "react";
import styles from "./SignUp.module.scss";
import Input from "../../../components/Input";
import Button, { ButtonType } from "../../../components/Button";
import FormPage from "../FormPage";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../../Router";

const SignUp = () => {
  const namelOnChange = () => {};

  const emailOnChange = () => {};

  const passOnChange = () => {};

  const confirmPassOnChange = () => {};

  return (
    <FormPage titleFormPage="Sign Up">
      <div className={styles.inputsWrapper}>
        <Input title="Name" placeholder="Your name" onChange={namelOnChange} />
        <Input
          title="Email"
          placeholder="Your email"
          onChange={emailOnChange}
        />
        <Input
          title="Password"
          placeholder="Your password"
          onChange={passOnChange}
        />
        <Input
          title="Confirm password"
          placeholder="Confirm password"
          onChange={confirmPassOnChange}
        />
        <div className={styles.buttonWrapper}>
          <Button
            title={"Sign In"}
            type={ButtonType.Primary}
            onClick={() => {}}
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
