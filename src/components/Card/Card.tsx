import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardProps, CardSize, CardType } from "./types";
import {
  BookmarkIcon,
  DislikeIcon,
  FilledBookmarkIcon,
  LikeIcon,
  MoreIcon,
} from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { usePostVisibilityContext } from "../../context/PostVisibility/Context";
import { LikeStatus } from "../../redux/reducers/postSlice";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image } = card;

  const { theme } = useThemeContext();
  const {
    postVisibility,
    onChangePostVisibility,
    onChangeStatus,
    likedPosts,
    dislikedPosts,
    onChangeBookmarkStatus,
    bookmarkPosts,
  } = usePostVisibilityContext();

  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isDark = theme === Theme.Dark;
  const likedIndex = likedPosts.findIndex((post) => post.id === card.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === card.id);
  const bookmarkIndex = bookmarkPosts.findIndex((post) => post.id === card.id);

  const onMoreBtnClick = (isPostOpened: boolean) => () => {
    onChangePostVisibility(card, isPostOpened);
  };

  const onStatusClick = (status: LikeStatus) => () => {
    onChangeStatus(status, card);
  };

  const onBookmarkStatusClick = () => {
    onChangeBookmarkStatus(card);
  };

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.mediumWrapper]: isMedium,
        [styles.smallWrapper]: isSmall,
        [styles.darkWrapper]: isDark,
      })}
    >
      <div
        className={classNames(styles.infoWrapper, {
          [styles.mediumInfoWrapper]: isMedium,
          [styles.smallInfoWrapper]: isSmall,
        })}
      >
        <div className={styles.mainInfoWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall,
                [styles.darkTitle]: isDark,
              })}
            >
              {title}
            </div>
          </div>
          {size === CardSize.Large && <div className={styles.text}>{text}</div>}
        </div>
        <img
          src={image}
          className={classNames(styles.image, {
            [styles.mediumImage]: isMedium,
            [styles.smallImage]: isSmall,
          })}
        />
      </div>
      <div className={styles.footer}>
        <div
          className={classNames(styles.iconsWrapper, {
            [styles.darkIconWrapper]: isDark,
          })}
        >
          <div
            className={styles.iconWrapper}
            onClick={onStatusClick(LikeStatus.Like)}
          >
            <LikeIcon />
            <div>{likedIndex > -1 && 1}</div>
          </div>
          <div
            className={styles.iconWrapper}
            onClick={onStatusClick(LikeStatus.Dislike)}
          >
            <DislikeIcon />
            <div>{dislikedIndex > -1 && 1}</div>
          </div>
        </div>
        <div
          className={classNames(styles.iconsWrapper, {
            [styles.darkIconWrapper]: isDark,
          })}
        >
          <div onClick={onBookmarkStatusClick}>
            {bookmarkIndex === -1 ? <BookmarkIcon /> : <FilledBookmarkIcon />}
          </div>
          {!postVisibility && (
            <div onClick={onMoreBtnClick(true)}>
              <MoreIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
