import { useId, type InputHTMLAttributes, type ReactNode } from "react";

import styles from "./Input.module.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leadingIcon?: ReactNode;
}

export function Input({
  label,
  error,
  leadingIcon,
  id,
  type = "text",
  disabled,
  required,
  className,
  "aria-describedby": ariaDescribedBy,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

  const controlClassName = [
    styles.control,
    error ? styles.controlError : undefined,
    disabled ? styles.controlDisabled : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>

      <div className={controlClassName}>
        {leadingIcon ? (
          <span className={styles.leadingIcon} aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}

        <input
          {...inputProps}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />

        {error ? (
          <span className={styles.error} id={errorId} role="alert">
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
}
