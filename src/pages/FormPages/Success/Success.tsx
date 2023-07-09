import React from "react";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";

const Success = () => {
  const navigate = useNavigate();

  const onHomeBtnClick = () => {
    navigate(RoutesList.Home);
  };

  return (
    <FormPage titleFormPage="Success">
      <div>
        <p>Email confirmed.</p>
        <p>Your registration is now completed</p>
      </div>
      <Button
        title={"Go to home"}
        type={ButtonType.Primary}
        onClick={onHomeBtnClick}
      />
    </FormPage>
  );
};

export default Success;
