import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import UserName from "../../../components/UserName";
import ThemeSwitcher from "../../../components/ThemeSwitcher";
import { RoutesList } from "../../Router";
import styles from "./Header.module.scss";
import classNames from "classnames";
import MenuButton from "../../../components/MenuButton";
import { UserIcon } from "../../../assets/icons";
import { ButtonType } from "../../../utils/@globalTypes";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logOutUser } from "../../../redux/reducers/authSlice";
const Header = () => {
  const dispatch = useDispatch();
  const [isOpened, setOpened] = useState(false);

  const menuButtonOnClick = () => {
    setOpened(!isOpened);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const signInBtnOnClick = () => {
    navigate(RoutesList.SignIn);
  };

  const logOutBtnOnClick = () => {
    dispatch(logOutUser());
  };

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
  const name = useSelector(AuthSelectors.getUserName);

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

  return (
    <>
      <div className={styles.wrapper}>
        <MenuButton isOpened={isOpened} menuButtonOnClick={menuButtonOnClick} />
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
