import React from "react";
import styles from "./Confirmation.module.scss";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";
import { useDispatch } from "react-redux";
import { activateUser } from "../../../redux/reducers/authSlice";

const Confirmation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid, token } = useParams();
  const onConfirmButtonClick = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => navigate(RoutesList.Success),
        })
      );
    }
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
        title={"Confirm"}
        type={ButtonType.Primary}
        onClick={onConfirmButtonClick}
      />
    </FormPage>
  );
};

export default Confirmation;
