import React, { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import UserName from "../../../components/UserName";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import { RoutesList } from "../../Router";
import styles from "./Header.module.scss";
import classNames from "classnames";
import MenuButton from "../../../components/MenuButton";
import { CloseMenuIcon, SearchIcon, UserIcon } from "../../../assets/icons";
import { ButtonType } from "../../../utils/@globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logOutUser } from "../../../redux/reducers/authSlice";
import Input from "../../../components/Input";
import { getSearchPosts } from "../../../redux/reducers/postSlice";
import { SEARCH_VALUE } from "../../../utils/constants";
const Header = () => {
  const dispatch = useDispatch();
  const [isOpened, setOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isInputOpened, setInputOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const name = useSelector(AuthSelectors.getUserName);

  const signInBtnOnClick = () => {
    navigate(RoutesList.SignIn);
  };

  const logOutBtnOnClick = () => {
    dispatch(logOutUser());
  };

  const menuButtonOnClick = () => {
    setOpened(!isOpened);
  };

  const onChangeSearchInput = (value: string) => {
    setSearchValue(value);
  };

  const onSearchClick = () => {
    setInputOpened(true);
    if (isInputOpened) {
      dispatch(getSearchPosts(searchValue));
      sessionStorage.setItem(SEARCH_VALUE, searchValue);
      navigate(RoutesList.Search);
    }
  };

  const onCloseSearchClick = () => {
    setInputOpened(false);
  };

  const navButtonsList = useMemo(
    () => [
      {
        title: "Home",
        key: RoutesList.Home,
      },
      ...(isLoggedIn
        ? [
            {
              title: "Add Post",
              key: RoutesList.AddPost,
            },
          ]
        : []),
    ],
    [isLoggedIn]
  );

  const userName = name ? name : "Одуванчик";

  const onEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <MenuButton isOpened={isOpened} menuButtonOnClick={menuButtonOnClick} />
        <div className={styles.inputWrapper}>
          {isInputOpened && (
            <div>
              <Input
                placeholder="Search..."
                onKeyDown={onEnterDown}
                inputType="text"
                onChange={onChangeSearchInput}
                className={styles.searchInput}
              />
              <div
                className={styles.closeSearchBtn}
                onClick={onCloseSearchClick}
              >
                <CloseMenuIcon />
              </div>
            </div>
          )}
        </div>
        <div className={styles.rightControls}>
          <Button
            title={<SearchIcon />}
            onClick={onSearchClick}
            type={ButtonType.Primary}
            className={styles.userBtn}
          />
          {isLoggedIn ? (
            <UserName userName={userName} />
          ) : (
            <Button
              title={<UserIcon />}
              onClick={signInBtnOnClick}
              type={ButtonType.Primary}
              className={styles.userBtn}
            />
          )}
        </div>
      </div>
      {isOpened && (
        <div className={styles.menuWrapper}>
          <div>
            {isLoggedIn && <UserName userName={userName} />}
            {navButtonsList.map(({ title, key }) => {
              return (
                <NavLink
                  to={key}
                  key={key}
                  className={classNames(styles.navBtn, {
                    [styles.activeNavBtn]: location.pathname === key,
                  })}
                >
                  {title}
                </NavLink>
              );
            })}
          </div>
          <div>
            <ThemeSwitcher />
            <Button
              title={isLoggedIn ? "Log out" : "Sign In"}
              onClick={isLoggedIn ? logOutBtnOnClick : signInBtnOnClick}
              type={ButtonType.Secondary}
              className={styles.bottomBtn}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
