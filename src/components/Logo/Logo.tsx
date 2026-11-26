import type { ImgHTMLAttributes } from "react";

import devlinksIcon from "../../assets/devlinks-icon.svg";
import devlinksLogo from "../../assets/devlinks-logo.svg";
import devlinksLogoLarge from "../../assets/devlinks-logo-large.svg";
import styles from "./Logo.module.css";

export type LogoSize = "small" | "medium" | "large";

export interface LogoProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height"
> {
  size?: LogoSize;
  showText?: boolean;
  alt?: string;
}

export function Logo({
  size = "medium",
  showText = true,
  alt = "Devlinks",
  className,
  ...imageProps
}: LogoProps) {
  const source =
    !showText || size === "small"
      ? devlinksIcon
      : size === "large"
        ? devlinksLogoLarge
        : devlinksLogo;

  const sizeClassName =
    !showText || size === "small"
      ? styles.small
      : size === "large"
        ? styles.large
        : styles.medium;

  const combinedClassName = [styles.logo, sizeClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <img {...imageProps} src={source} alt={alt} className={combinedClassName} />
  );
}
