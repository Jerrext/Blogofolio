import React from "react";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { Link } from "react-router-dom";
import { RoutesList } from "../../Router";
import { ButtonType } from "../../../utils/@globalTypes";

const Success = () => {
  return (
    <FormPage titleFormPage="Success">
      <div>
        <p>Email confirmed.</p>
        <p>Your registration is now completed</p>
      </div>
      <Link to={RoutesList.Home}>
        <Button
          title={"Go to home"}
          type={ButtonType.Primary}
          onClick={() => {}}
        />
      </Link>
    </FormPage>
  );
};

export default Success;
