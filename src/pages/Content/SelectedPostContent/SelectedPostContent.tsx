import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSinglePost,
  LikeStatus,
  PostSelectors,
  setBookmarkStatus,
  setSinglePost,
  setStatus,
} from "../../../redux/reducers/postSlice";
import { CardType } from "../../../utils/@globalTypes";
import Content from "../Content";

const SelectedPostContent = () => {
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
    return () => {
      dispatch(setSinglePost(null));
    };
  }, []);

  return (
    singlePost && (
      <Content
        singlePost={singlePost}
        onChangeStatus={onChangeStatus}
        onChangeBookmarkStatus={onChangeBookmarkStatus}
      />
    )
  );
};

export default SelectedPostContent;
