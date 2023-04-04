import React, { FC, ReactNode } from "react";
import { Theme, ThemeContext } from "./Context";

type ThemeProviderProps = {
  children: ReactNode | ReactNode[];
  theme: Theme;
  onChangeTheme: (value: Theme) => void;
};
const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  theme,
  onChangeTheme,
}) => {
  return (
    <ThemeContext.Provider value={{ theme, onChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
