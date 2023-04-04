import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostModalWindow from "../../components/PostModalWindow";
import SearchCardList from "../../components/SearchCardList";
import Title from "../../components/Title";
import { getSearchPosts, PostSelectors } from "../../redux/reducers/postSlice";
import { SEARCH_VALUE } from "../../utils/constants";
import styles from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();

  const searchValue = useSelector(PostSelectors.getSearchValue);
  const searchCardList = useSelector(PostSelectors.getSearchPosts);
  const post = useSelector(PostSelectors.getPostValue);

  // Чтоб при обновлении страницы поиска не пропадал searchList
  useEffect(() => {
    const newSearchValue = sessionStorage.getItem(SEARCH_VALUE);
    newSearchValue && dispatch(getSearchPosts(newSearchValue));
  }, []);

  return (
    <>
      <div className={styles.searchWrapper}>
        <Title title={`Search results '${searchValue}'`} />
        <SearchCardList cardsList={searchCardList} />
      </div>
      {post && <PostModalWindow post={post} />}
    </>
  );
};
export default Search;
