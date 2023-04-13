import React, { useEffect } from "react";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  BookmarkIcon,
  DislikeIcon,
  FilledBookmarkIcon,
  LikeIcon,
} from "../../assets/icons";
import Button from "../../components/Button";
import Title from "../../components/Title";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import {
  getSinglePost,
  LikeStatus,
  PostSelectors,
  setBookmarkStatus,
  setSinglePost,
  setStatus,
} from "../../redux/reducers/postSlice";
import { ButtonType, CardType } from "../../utils/@globalTypes";
import { RoutesList } from "../Router";
import styles from "./Content.module.scss";
import Loader from "../../components/Loader/Loader";

const Content = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();

  const singlePost = useSelector(PostSelectors.getSinglePost);

  const onChangeStatus = (status: LikeStatus, card: CardType) => {
    dispatch(setStatus({ status, card }));
  };

  const onChangeBookmarkStatus = (card: CardType) => {
    dispatch(setBookmarkStatus(card));
  };

  useEffect(() => {
    postId && dispatch(getSinglePost(postId));
  }, [postId]);

  useEffect(() => {
    return () => {
      dispatch(setSinglePost(null));
    };
  }, [])

  const { theme } = useThemeContext();

  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const bookmarkPosts = useSelector(PostSelectors.getBookmarkPosts);
  const isSinglePostLoading = useSelector(PostSelectors.getSinglePostLoading);

  const likedIndex = likedPosts.findIndex((post) => post.id === singlePost?.id);
  const dislikedIndex = dislikedPosts.findIndex(
    (post) => post.id === singlePost?.id
  );
  const bookmarkIndex = bookmarkPosts.findIndex(
    (post) => post.id === singlePost?.id
  );

  const isDark = theme === Theme.Dark;

  const onStatusClick = (status: LikeStatus) => () => {
    singlePost && onChangeStatus(status, singlePost);
  };

  const onBookmarkStatusClick = () => {
    singlePost && onChangeBookmarkStatus(singlePost);
  };

  return isSinglePostLoading ? (
    <Loader />
  ) : (
    singlePost && (
      <div className={styles.container}>
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
            <div className={styles.navItem}>Post {singlePost.id}</div>
          </div>
          <Title title={singlePost.title} />
        </div>
        <div>
          <img src={singlePost.image} alt="image" className={styles.image} />
        </div>
        <p
          className={classnames(styles.text, {
            [styles.darkText]: isDark,
          })}
        >
          {singlePost.text}
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
    )
  );
};

export default Content;
