import React, { FC, useState } from "react";
import Card from "../Card";
import styles from "./PostModalWindow.module.scss";
import { usePostVisibilityContext } from "../../context/PostVisibility/Context";
import { ClosePostIcon } from "../../assets/icons";
import { CardSize, CardType } from "../../utils/@globalTypes";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";

type PostModalWindowProps = {
  post: CardType;
};

const PostModalWindow: FC<PostModalWindowProps> = ({ post }) => {
  const { postVisibility, onChangePostVisibility } = usePostVisibilityContext();
  const { theme } = useThemeContext();

  const isDark = theme === Theme.Dark;

  const onCloseBtnClick = (post: null, isPostOpened: boolean) => () => {
    onChangePostVisibility(post, isPostOpened);
  };
  return (
    <div>
      {postVisibility && (
        <div className={styles.modalWindow}>
          <div
            className={classNames(styles.wrapper, {
              [styles.darkWrapper]: isDark,
            })}
          >
            <div
              className={classNames(styles.closeBtn, {
                [styles.darkCloseBtn]: isDark,
              })}
              onClick={onCloseBtnClick(null, false)}
            >
              <ClosePostIcon />
            </div>
            <Card card={post} size={CardSize.Large} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModalWindow;
