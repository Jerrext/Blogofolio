import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import classNames from "classnames";
import styles from "./Home.module.scss";
import Title from "../../components/Title";
import Tabs from "../../components/Tabs";
import CardsList from "../../components/CardsList";
import {
  getAllPosts,
  getMyPosts,
  PostSelectors,
} from "../../redux/reducers/postSlice";
import PostModalWindow from "../../components/PostModalWindow";
import { ButtonType, TabsNames } from "../../utils/@globalTypes";
import { PER_PAGE } from "../../utils/constants";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { ArrowIcon } from "../../assets/icons";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import { AuthSelectors } from "../../redux/reducers/authSlice";

enum Order {
  Title = "title",
  Date = "date",
}

const Home = () => {
  const [activeTab, setActiveTab] = useState(TabsNames.All);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageMyPosts, setcurrentPageMyPosts] = useState(1);
  const [ordering, setOrdering] = useState("");
  const dispatch = useDispatch();
  const { theme } = useThemeContext();

  const post = useSelector(PostSelectors.getPostValue);
  const likedPosts = useSelector(PostSelectors.getLikedPosts);
  const bookmarkPosts = useSelector(PostSelectors.getBookmarkPosts);
  const postsList = useSelector(PostSelectors.getAllPosts);
  const myPosts = useSelector(PostSelectors.getMyPosts);
  const isAllPostsLoading = useSelector(PostSelectors.getAllPostsLoading);
  const postsCount = useSelector(PostSelectors.getAllPostsCount);
  const pagesCount = Math.ceil(postsCount / PER_PAGE);
  const myPostsCount = useSelector(PostSelectors.getMyPostsCount);
  const pagesMyPostsCount = Math.ceil(myPostsCount / PER_PAGE);
  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const isDark = theme === Theme.Dark;

  const getPagesCount = () => {
    switch (activeTab) {
      case TabsNames.MyPosts:
        return pagesMyPostsCount;
      case TabsNames.All:
      default:
        return pagesCount;
    }
  };

  const getCurrentList = () => {
    switch (activeTab) {
      case TabsNames.Popular:
        return likedPosts;
      case TabsNames.MyPosts:
        return myPosts;
      case TabsNames.Favorites:
        return bookmarkPosts;
      case TabsNames.All:
      default:
        return postsList;
    }
  };

  const onTabClick = (key: TabsNames) => {
    setActiveTab(key);
    setCurrentPage(1);
    setcurrentPageMyPosts(1);
  };

  const onPageChange = ({ selected }: { selected: number }) => {
    switch (activeTab) {
      case TabsNames.MyPosts:
        setcurrentPageMyPosts(selected + 1);
        break;
      case TabsNames.All:
        setCurrentPage(selected + 1);
        break;
      default:
        break;
    }
  };

  const onOrderClick = (order: Order) => () => {
    setCurrentPage(1);
    if (order === ordering) {
      setOrdering("");
    } else {
      setOrdering(order);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const offset = PER_PAGE * (currentPageMyPosts - 1);
      dispatch(getMyPosts({ offset }));
    }
  }, [isLoggedIn, currentPageMyPosts]);

  useEffect(() => {
    const offset = PER_PAGE * (currentPage - 1);
    dispatch(getAllPosts({ offset, ordering }));
    console.log(
      (activeTab === TabsNames.All && currentPage === pagesCount) ||
        (activeTab === TabsNames.MyPosts &&
          currentPageMyPosts === pagesMyPostsCount)
    );
  }, [currentPage, ordering]);

  return (
    <>
      <div className={styles.wrapper}>
        <Title title={"Blog"} />
        <Tabs onClick={onTabClick} activeTab={activeTab} />
        {isAllPostsLoading ? (
          <Loader />
        ) : (
          <>
            {activeTab === TabsNames.All && (
              <div className={styles.orderControlsWrapper}>
                <Button
                  title="Отсортировать по названию"
                  onClick={onOrderClick(Order.Title)}
                  type={ButtonType.Secondary}
                  className={classNames({
                    [styles.activeBtn]: ordering === Order.Title,
                  })}
                />
                <Button
                  title="Отсортировать по дате"
                  onClick={onOrderClick(Order.Date)}
                  type={ButtonType.Secondary}
                  className={classNames({
                    [styles.activeBtn]: ordering === Order.Date,
                  })}
                />
              </div>
            )}
            <div className={styles.cardListWrapper}>
              <CardsList cardsList={getCurrentList()} />
            </div>
            {activeTab !== TabsNames.Popular &&
              activeTab !== TabsNames.Favorites && (
                <ReactPaginate
                  nextLabel={<ArrowIcon />}
                  previousLabel={<ArrowIcon />}
                  pageCount={getPagesCount()}
                  forcePage={currentPage - 1}
                  onPageChange={onPageChange}
                  containerClassName={styles.pagesContainer}
                  pageClassName={styles.pageNumber}
                  breakClassName={styles.pageNumber}
                  breakLinkClassName={styles.linkPage}
                  activeLinkClassName={classNames(styles.linkPage, {
                    [styles.darkLinkPage]: isDark,
                  })}
                  pageLinkClassName={classNames(styles.linkPage, {
                    [styles.darkLinkPage]: isDark,
                  })}
                  activeClassName={styles.activePageNumber}
                  nextClassName={classNames(styles.arrowButton, {
                    [styles.blockedButtonPosts]:
                      (activeTab === TabsNames.All &&
                        currentPage === pagesCount) ||
                      (activeTab === TabsNames.MyPosts &&
                        currentPageMyPosts === pagesMyPostsCount),
                  })}
                  previousClassName={classNames(styles.arrowButton, {
                    [styles.blockedButtonPosts]:
                      (activeTab === TabsNames.All && currentPage === 1) ||
                      (activeTab === TabsNames.MyPosts &&
                        currentPageMyPosts === 1),
                  })}
                  previousLinkClassName={classNames(styles.linkPage, {
                    [styles.darkLinkPage]: isDark,
                  })}
                  nextLinkClassName={classNames(styles.linkPage, {
                    [styles.darkLinkPage]: isDark,
                  })}
                />
              )}
          </>
        )}
      </div>
      {post && <PostModalWindow post={post} />}
    </>
  );
};

export default Home;
