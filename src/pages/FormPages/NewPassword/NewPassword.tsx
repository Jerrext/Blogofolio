import React, { useEffect, useMemo, useState } from "react";
import Button from "../../../components/Button";
import FormPage from "../FormPage";
import { ButtonType } from "../../../utils/@globalTypes";
import Input from "../../../components/Input";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { newPassword } from "../../../redux/reducers/authSlice";
import { RoutesList } from "../../Router";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    return passwordError.length === 0;
  }, [passwordError]);

  const setPasswordOnClick = () => {
    if (uid && token) {
      dispatch(
        newPassword({
          data: { uid, token, new_password: password },
          callback: () => navigate(RoutesList.SignIn),
        })
      );
    }
  };

  return (
    <FormPage titleFormPage="New password">
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
        placeholder="Confirm your email"
        inputType="password"
        errText={passwordError}
        onChange={setConfirmPassword}
      />
      <Button
        title={"Set password"}
        type={ButtonType.Primary}
        disabled={!isValid}
        onClick={setPasswordOnClick}
      />
    </FormPage>
  );
};

export default NewPassword;
