import React from "react";
import styles from "./Confirmation.module.scss";
import Button, { ButtonType } from "../../../components/Button";
import FormPage from "../FormPage";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";

const Confirmation = () => {
  const navigate = useNavigate();
  const homeBtnOnClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <FormPage titleFormPage="Registration Confirmation">
      <div className={styles.confirmText}>
        <p>
          Please activate your account with the activation link in the email
          example@gmail.com.
        </p>
        <p>Please, check your email</p>
      </div>
      <Button
        title={"Go to home"}
        type={ButtonType.Primary}
        onClick={homeBtnOnClick}
      />
    </FormPage>
  );
};

export default Confirmation;
