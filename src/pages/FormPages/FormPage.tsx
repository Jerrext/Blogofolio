import React, { ReactNode, FC } from "react";
import classNames from "classnames";
import Title from "../../components/Title";
import styles from "./FormPage.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { NavLink } from "react-router-dom";
import { RoutesList } from "../Router";

type FormPageProps = {
  children: ReactNode;
  titleFormPage: string;
};

const FormPage: FC<FormPageProps> = ({ children, titleFormPage }) => {
  const { theme } = useThemeContext();
  return (
    <>
      <div
        className={classNames(styles.wrapper, {
          [styles.darkWrapper]: theme === Theme.Dark,
        })}
      >
        <NavLink to={RoutesList.Home} className={styles.btnHome}>
          Back to home
        </NavLink>
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
