/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/*
 * @Author: SlahserZ
 * @Date: 2023-01-05 11:32:44
 * @LastEditors: SlahserZ
 * @LastEditTime: 2023-01-06 16:54:55
 * @FilePath: /monorepo-startkit/packages/components/src/Button/index.tsx
 * @Description: Button component
 */
import React, { HTMLAttributes } from "react";
import classNames from "classnames";

import { CLASS_PREFIX, StyledButton } from "./styles";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  size?: "small" | "middle" | "large";
  loading?: boolean;
  type?: "default" | "dashed" | "primary" | "link" | "text";
  shape?: "default" | "circle" | "round";
}

/**
 * @description: Button component
 * @return {React.FC}
 */
export const Button: React.FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const {
    danger = false,
    disabled = false,
    icon,
    size,
    loading = false,
    type = "default",
    children,
    onClick,
    className,
    shape,
    ...rest
  } = props;

  const classes = classNames(
    CLASS_PREFIX,
    {
      [`${CLASS_PREFIX}-${type}`]: type,
      [`${CLASS_PREFIX}-${shape}`]: shape,
      [`${CLASS_PREFIX}-disabled`]: !!disabled,
      [`${CLASS_PREFIX}-danger`]: !!danger,
      [`${CLASS_PREFIX}-${size}`]: size !== "middle" && size,
    },
    className
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (loading || disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <StyledButton
      {...rest}
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
    >
      {loading ? "loading" : icon}
      <span>{children}</span>
    </StyledButton>
  );
});

export default Button;
