import React, { ChangeEvent, FC, useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";

type InputProps = {
  title: string;
  placeholder: string;
  inputType: string;
  disabled?: boolean;
  errText?: string;
  className?: string;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({
  title,
  placeholder,
  inputType,
  disabled,
  errText,
  className,
  onChange,
}) => {
  const { theme } = useThemeContext();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputWrapper}>
      <p
        className={classNames(styles.title, {
          [styles.datkTitle]: theme === Theme.Dark,
        })}
      >
        {title}
      </p>
      <input
        className={classNames(styles.input, className, {
          [styles.disabledInp]: disabled,
          [styles.errorInput]: errText,
        })}
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChangeText}
      />
      {errText && <p className={styles.errorText}>{errText}</p>}
    </div>
  );
};

export default Input;
