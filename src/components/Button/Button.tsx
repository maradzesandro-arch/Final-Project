import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  fullWidth = false,
  type = "button",
  className,
  children,
  ...buttonProps
}: ButtonProps) {
  const variantClassName =
    variant === "secondary" ? styles.secondary : styles.primary;

  const combinedClassName = [
    styles.button,
    variantClassName,
    fullWidth ? styles.fullWidth : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={combinedClassName}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
