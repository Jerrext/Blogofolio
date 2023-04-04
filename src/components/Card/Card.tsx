import React, { FC } from "react";
import classNames from "classnames";
import styles from "./Card.module.scss";
import { CardProps } from "./types";
import {
  BookmarkIcon,
  DislikeIcon,
  FilledBookmarkIcon,
  LikeIcon,
  MoreIcon,
} from "../../assets/icons";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import {
  LikeStatus,
  PostSelectors,
  setBookmarkStatus,
  setPostVisibility,
  setSelectedPost,
  setStatus,
} from "../../redux/reducers/postSlice";
import { CardSize, CardType } from "../../utils/@globalTypes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors } from "../../redux/reducers/authSlice";

const Card: FC<CardProps> = ({ card, size }) => {
  const { title, text, date, image, id } = card;

  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const isPostOpened = useSelector(PostSelectors.getPostVisibility);
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const bookmarkPosts = useSelector(PostSelectors.getBookmarkPosts);

  const isMedium = size === CardSize.Medium;
  const isSmall = size === CardSize.Small;
  const isSearch = size === CardSize.Search;
  const isDark = theme === Theme.Dark;

  const likedIndex = likedPosts.findIndex((post) => post.id === card.id);
  const dislikedIndex = dislikedPosts.findIndex((post) => post.id === card.id);
  const bookmarkIndex = bookmarkPosts.findIndex((post) => post.id === card.id);

  const onTitleClick = () => {
    navigate(`/blog/${id}`);
  };

  const onChangePostVisibility = (
    post: CardType | null,
    isPostOpened: boolean
  ) => {
    dispatch(setPostVisibility(isPostOpened));
    dispatch(setSelectedPost(post));
  };

  const onChangeStatus = (status: LikeStatus, card: CardType) => {
    dispatch(setStatus({ status, card }));
  };

  const onChangeBookmarkStatus = (card: CardType) => {
    dispatch(setBookmarkStatus(card));
  };

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
        [styles.searchWrapper]: isSearch,
      })}
    >
      <div
        className={classNames(styles.infoWrapper, {
          [styles.mediumInfoWrapper]: isMedium,
          [styles.smallInfoWrapper]: isSmall,
          [styles.searchInfoWrapper]: isSearch,
        })}
      >
        <div className={styles.mainInfoWrapper}>
          <div className={styles.titleWrapper}>
            <div className={styles.date}>{date}</div>
            <div
              className={classNames(styles.title, {
                [styles.mediumTitle]: isMedium || isSmall || isSearch,
                [styles.darkTitle]: isDark,
              })}
              onClick={onTitleClick}
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
            [styles.smallImage]: isSmall || isSearch,
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
          {isLoggedIn && (
            <div className={styles.iconWrapper} onClick={onBookmarkStatusClick}>
              {bookmarkIndex === -1 ? <BookmarkIcon /> : <FilledBookmarkIcon />}
            </div>
          )}
          {!isPostOpened && (
            <div className={styles.iconWrapper} onClick={onMoreBtnClick(true)}>
              <MoreIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
