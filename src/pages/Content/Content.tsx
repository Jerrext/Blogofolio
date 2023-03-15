import React, { FC } from "react";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  BookmarkIcon,
  DislikeIcon,
  FilledBookmarkIcon,
  LikeIcon,
} from "../../assets/icons";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { LikeStatus, PostSelectors } from "../../redux/reducers/postSlice";
import { ButtonType, CardType } from "../../utils/@globalTypes";
import { RoutesList } from "../Router";
import styles from "./Content.module.scss";

type ContentProps = {
  singlePost: CardType;
  onChangeStatus: (status: LikeStatus, card: CardType) => void;
  onChangeBookmarkStatus: (card: CardType) => void;
};

const Content: FC<ContentProps> = ({
  singlePost,
  onChangeStatus,
  onChangeBookmarkStatus,
}) => {
  const { title, text, image, id } = singlePost;

  const { theme } = useThemeContext();

  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const bookmarkPosts = useSelector(PostSelectors.getBookmarkPosts);

  const likedIndex = likedPosts.findIndex((post) => post.id === singlePost.id);
  const dislikedIndex = dislikedPosts.findIndex(
    (post) => post.id === singlePost.id
  );
  const bookmarkIndex = bookmarkPosts.findIndex(
    (post) => post.id === singlePost.id
  );

  const isDark = theme === Theme.Dark;

  const onStatusClick = (status: LikeStatus) => () => {
    onChangeStatus(status, singlePost);
  };

  const onBookmarkStatusClick = () => {
    onChangeBookmarkStatus(singlePost);
  };

  return (
    <div className={styles.conrainer}>
      <div className={styles.headerWrapper}>
        <div className={styles.navigation}>
          <NavLink
            to={RoutesList.Home}
            className={classnames(styles.navItem, {
              [styles.darkNavItem]: isDark,
            })}
          >
            Home
          </NavLink>
          <div className={styles.navItem}>Post {id}</div>
        </div>
        <Title title={title} />
      </div>
      <div>
        <img src={image} alt="image" className={styles.image} />
      </div>
      <p
        className={classnames(styles.text, {
          [styles.darkText]: isDark,
        })}
      >
        {text}
      </p>
      <div className={styles.btnWrapper}>
        <div className={styles.leftBtn}>
          <Button
            title={
              <div className={styles.iconWrapper}>
                <LikeIcon />
                {likedIndex > -1 && <div>1</div>}
              </div>
            }
            type={ButtonType.Secondary}
            onClick={onStatusClick(LikeStatus.Like)}
            className={styles.statusBtn}
          />
          <Button
            title={
              <div className={styles.iconWrapper}>
                <DislikeIcon />
                {dislikedIndex > -1 && <div>1</div>}
              </div>
            }
            type={ButtonType.Secondary}
            onClick={onStatusClick(LikeStatus.Dislike)}
            className={styles.statusBtn}
          />
        </div>
        <Button
          title={
            <div className={styles.rightBtn}>
              {bookmarkIndex > -1 ? <FilledBookmarkIcon /> : <BookmarkIcon />}
              <div>Add to favorites</div>
            </div>
          }
          type={ButtonType.Secondary}
          onClick={onBookmarkStatusClick}
        />
      </div>
    </div>
  );
};

export default Content;
