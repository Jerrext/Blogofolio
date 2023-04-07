import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostModalWindow from "../../components/PostModalWindow";
import SearchCardList from "../../components/SearchCardList";
import Title from "../../components/Title";
import { getSearchPosts, PostSelectors } from "../../redux/reducers/postSlice";
import { PER_PAGE, SEARCH_VALUE } from "../../utils/constants";
import styles from "./Search.module.scss";
import Loader from "../../components/Loader/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Search = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector(PostSelectors.getSearchValue);
  const searchCardList = useSelector(PostSelectors.getSearchPosts);
  const post = useSelector(PostSelectors.getPostValue);
  // const isSearchPostsLoading = useSelector(PostSelectors.getSearchPostsLoading);
  const postsCount = useSelector(PostSelectors.getSearchedPostsCount);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const offset = (page - 1) * PER_PAGE;
    const newSearchValue = sessionStorage.getItem(SEARCH_VALUE);
    newSearchValue &&
      dispatch(
        getSearchPosts({
          searchValue: newSearchValue,
          isOverwrite: false,
          offset,
        })
      );
  }, [page]);

  const onNextReached = () => {
    setPage(page + 1);
  };

  return (
    <>
      <div className={styles.searchWrapper}>
        <Title title={`Search results '${searchValue}'`} />
        <InfiniteScroll
          next={onNextReached}
          hasMore={searchCardList.length < postsCount}
          loader={<Loader />}
          dataLength={searchCardList.length}
          scrollThreshold={0.8}
          scrollableTarget="scrollableDiv"
          className={styles.scrollWrapper}
        >
          <SearchCardList cardsList={searchCardList} />
        </InfiniteScroll>
      </div>
      {post && <PostModalWindow post={post} />}
    </>
  );
};
export default Search;
