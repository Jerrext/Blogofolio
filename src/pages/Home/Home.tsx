import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Tabs, { TabsNames } from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPosts,
  LikeStatus,
  PostSelectors,
  setBookmarkStatus,
  setPostVisibility,
  setSelectedPost,
  setStatus,
} from "../../redux/reducers/postSlice";
import PostModalWindow from "../../components/PostModalWindow";
import PostVisibilityProvider from "../../context/PostVisibility/Provider";
import { CardType } from "../../utils/@globalTypes";

const TABS_LIST = [
  {
    title: "All",
    disabled: false,
    key: TabsNames.All,
  },
  {
    title: "My favorites",
    disabled: false,
    key: TabsNames.Favorites,
  },
  {
    title: "Popular",
    disabled: false,
    key: TabsNames.Popular,
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.All);
  const dispatch = useDispatch();

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

  const isPostOpened = useSelector(PostSelectors.getPostVisibility);
  const post = useSelector(PostSelectors.getPostValue);
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const dislikedPosts = useSelector(PostSelectors.getDislikedPosts);
  const bookmarkPosts = useSelector(PostSelectors.getBookmarkPosts);
  const postsList = useSelector(PostSelectors.getAllPosts);

  const onTabClick = (key: TabsNames) => setActiveTab(key);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <PostVisibilityProvider
      postVisibility={isPostOpened}
      onChangePostVisibility={onChangePostVisibility}
      onChangeStatus={onChangeStatus}
      likedPosts={likedPosts}
      dislikedPosts={dislikedPosts}
      onChangeBookmarkStatus={onChangeBookmarkStatus}
      bookmarkPosts={bookmarkPosts}
    >
      <div>
        <Title title={"Blog"} />
        <Tabs tabsList={TABS_LIST} onClick={onTabClick} activeTab={activeTab} />
        <CardsList cardsList={postsList} />
      </div>
      {post && <PostModalWindow post={post} />}
    </PostVisibilityProvider>
  );
};

export default Home;
