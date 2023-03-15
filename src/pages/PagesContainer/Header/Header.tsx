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

const Header = () => {
  const [isOpened, setOpened] = useState(false);

  const menuButtonOnClick = () => {
    setOpened(!isOpened);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const signInBtnOnClick = () => {
    navigate(RoutesList.SignIn);
  };

  const isLoggedIn = false;

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

  return (
    <>
      <div className={styles.wrapper}>
        <MenuButton isOpened={isOpened} menuButtonOnClick={menuButtonOnClick} />
        {isLoggedIn ? (
          <UserName userName={"Artem Malkin"} />
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
            {isLoggedIn && <UserName userName={"Artem Malkin"} />}
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
              onClick={isLoggedIn ? () => {} : signInBtnOnClick}
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
