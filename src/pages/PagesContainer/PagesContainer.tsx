import React from "react";
import { Outlet } from "react-router-dom";
import classNames from "classnames";

import styles from "./PagesContainer.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import Header from "./Header";

const PagesContainer = () => {
  const { theme } = useThemeContext();

  const isDark = theme === Theme.Dark;

  return (
    <div
      className={classNames(styles.container, {
        [styles.darkContainer]: isDark,
      })}
      id="scrollableDiv"
    >
      <Header />
      <div className={styles.mainContainer}>
        <Outlet />
        <div
          className={classNames(styles.footer, {
            [styles.darkFooter]: isDark,
          })}
        >
          <div>©2022 Blogfolio</div>
          <div>All rights reserved</div>
        </div>
      </div>
    </div>
  );
};

export default PagesContainer;
