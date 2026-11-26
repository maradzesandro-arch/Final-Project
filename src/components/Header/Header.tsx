import type { ButtonHTMLAttributes } from "react";

import linkIcon from "../../assets/link-icon.svg";
import previewIcon from "../../assets/preview-icon.svg";
import profileIcon from "../../assets/profile-icon.svg";
import { Button } from "../Button";
import { Logo } from "../Logo";
import styles from "./Header.module.css";

export type HeaderTab = "links" | "profile";

export interface HeaderProps {
  activeTab?: HeaderTab;
  onTabChange?: (tab: HeaderTab) => void;
  onPreview?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  className?: string;
}

export function Header({
  activeTab = "links",
  onTabChange,
  onPreview,
  className,
}: HeaderProps) {
  const combinedClassName = [styles.header, className]
    .filter(Boolean)
    .join(" ");

  const selectTab = (tab: HeaderTab) => {
    onTabChange?.(tab);
  };

  return (
    <header className={combinedClassName}>
      <div className={styles.container}>
        <Logo
          className={styles.logoDesktop}
          size="medium"
          showText
          alt="Devlinks"
        />
        <Logo
          className={styles.logoMobile}
          size="small"
          showText={false}
          alt="Devlinks"
        />

        <nav className={styles.navigation} aria-label="Editor navigation">
          <button
            type="button"
            className={`${styles.tab} ${activeTab === "links" ? styles.activeTab : ""}`}
            aria-current={activeTab === "links" ? "page" : undefined}
            onClick={() => selectTab("links")}
          >
            <img src={linkIcon} alt="" className={styles.tabIcon} />
            <span className={styles.tabText}>Links</span>
          </button>

          <button
            type="button"
            className={`${styles.tab} ${activeTab === "profile" ? styles.activeTab : ""}`}
            aria-current={activeTab === "profile" ? "page" : undefined}
            onClick={() => selectTab("profile")}
          >
            <img src={profileIcon} alt="" className={styles.tabIcon} />
            <span className={styles.tabText}>Profile Details</span>
          </button>
        </nav>

        <Button
          variant="secondary"
          className={styles.previewDesktop}
          onClick={onPreview}
          aria-label="Preview profile"
        >
          Preview
        </Button>

        <Button
          variant="secondary"
          className={styles.previewMobile}
          onClick={onPreview}
          aria-label="Preview profile"
        >
          <img src={previewIcon} alt="" className={styles.previewIcon} />
        </Button>
      </div>
    </header>
  );
}
