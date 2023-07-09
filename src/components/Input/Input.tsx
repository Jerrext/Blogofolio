import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";
import { Theme, useThemeContext } from "../../context/Theme/Context";

type InputProps = {
  textarea?: boolean;
  value: string;
  title?: string;
  placeholder: string;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  inputType: string;
  disabled?: boolean;
  errText?: string;
  className?: string;
  onChange: (value: string) => void;
};

const Input: FC<InputProps> = ({
  textarea,
  value,
  title,
  placeholder,
  inputType,
  disabled,
  errText,
  className,
  onChange,
  onKeyDown,
}) => {
  const { theme } = useThemeContext();

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
      {textarea ? (
        <textarea
          value={value}
          className={classNames(styles.input, className, styles.textarea, {
            [styles.disabledInp]: disabled,
            [styles.errorInput]: errText,
          })}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeTextarea}
        ></textarea>
      ) : (
        <input
          value={value}
          className={classNames(styles.input, className, {
            [styles.disabledInp]: disabled,
            [styles.errorInput]: errText,
          })}
          type={inputType}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeText}
        />
      )}
      {errText && <p className={styles.errorText}>{errText}</p>}
    </div>
  );
};

export default Input;
