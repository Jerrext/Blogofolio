import React, { FC, useMemo } from "react";
import classNames from "classnames";
import styles from "./Tabs.module.scss";
import { TabsProps } from "./types";
import { Theme, useThemeContext } from "../../context/Theme/Context";
import { useSelector } from "react-redux";
import { AuthSelectors } from "../../redux/reducers/authSlice";
import { TabsNames } from "../../utils/@globalTypes";

const Tabs: FC<TabsProps> = ({ onClick, activeTab }) => {
  const onTabClick = (key: TabsNames) => () => onClick(key);
  const { theme } = useThemeContext();

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  const TABS_LIST = useMemo(
    () => [
      {
        title: "All",
        disabled: false,
        key: TabsNames.All,
      },
      {
        title: "My Posts",
        disabled: !isLoggedIn,
        key: TabsNames.MyPosts,
      },
      {
        title: "Popular",
        disabled: false,
        key: TabsNames.Popular,
      },
      {
        title: "Favourites",
        disabled: !isLoggedIn,
        key: TabsNames.Favorites,
      },
    ],
    [isLoggedIn]
  );
  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.darkWrapper]: theme === Theme.Dark,
      })}
    >
      {TABS_LIST.map((tab) => {
        return (
          <div
            key={tab.key}
            className={classNames(styles.tab, {
              [styles.activeTab]: activeTab === tab.key,
              [styles.disabled]: tab.disabled,
            })}
            onClick={tab.disabled ? undefined : onTabClick(tab.key)}
          >
            {tab.title}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
