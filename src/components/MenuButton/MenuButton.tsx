import React, { FC, ReactNode, useState } from "react";
import classNames from "classnames";
import styles from "./MenuButton.module.scss";
import Button from "../Button";
import { CloseMenuIcon, OpenMenuIcon } from "../../assets/icons";
import { ButtonType } from "../../utils/@globalTypes";

type MenuButtonProps = {
  isOpened: boolean;
  menuButtonOnClick: () => void;
};

const MenuButton: FC<MenuButtonProps> = ({ isOpened, menuButtonOnClick }) => {
  return (
    <Button
      className={styles.button}
      title={isOpened ? <CloseMenuIcon /> : <OpenMenuIcon />}
      type={ButtonType.Primary}
      onClick={menuButtonOnClick}
    />
  );
};

export default MenuButton;
