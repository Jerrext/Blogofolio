import React, { FC, useState } from "react";
import Card from "../Card";
import styles from "./PostModalWindow.module.scss";
import { ClosePostIcon } from "../../assets/icons";
import { CardSize, CardType } from "../../utils/@globalTypes";
import classNames from "classnames";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  PostSelectors,
  setPostVisibility,
  setSelectedPost,
} from "../../redux/reducers/postSlice";

type PostModalWindowProps = {
  post: CardType;
};

const PostModalWindow: FC<PostModalWindowProps> = ({ post }) => {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();

  const postVisibility = useSelector(PostSelectors.getPostVisibility);

  const isDark = theme === Theme.Dark;

  const onCloseBtnClick = () => {
    dispatch(setPostVisibility(false));
    dispatch(setSelectedPost(null));
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
              onClick={onCloseBtnClick}
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
