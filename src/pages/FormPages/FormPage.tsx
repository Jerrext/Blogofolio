import React, { ReactNode, FC } from "react";
import classNames from "classnames";
import Title from "../../components/Title";
import styles from "./FormPage.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";

type FormPageProps = {
  children: ReactNode;
  titleFormPage: string;
};

const FormPage: FC<FormPageProps> = ({ children, titleFormPage }) => {
  const navigate = useNavigate();
  const backHomeBtnOnClick = () => {
    navigate(RoutesList.Home);
  };
  const { theme } = useThemeContext();
  return (
    <>
      <div
        className={classNames(styles.wrapper, {
          [styles.darkWrapper]: theme === Theme.Dark,
        })}
      >
        <div className={styles.btnHome} onClick={backHomeBtnOnClick}>
          Back to home
        </div>
        <Title title={titleFormPage} className={styles.title} />
        <div className={styles.frameWrapper}>
          <div
            className={classNames(styles.formWrapper, {
              [styles.darkFormWrapper]: theme === Theme.Dark,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPage;
