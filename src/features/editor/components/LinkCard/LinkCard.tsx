import linkIcon from "../../../../assets/link-icon.svg";
import { Input } from "../../../../components/Input";
import { useEditorStore } from "../../../../store";
import type { Link, PlatformName } from "../../../../types";
import { PlatformSelect } from "../PlatformSelect";
import styles from "./LinkCard.module.css";
import { useEffect, useState } from "react";
import { validatePlatformUrl } from "../../../../lib/platformValidation";

interface LinkCardProps {
  link: Link;
  index: number;
  total: number;
  error?: string;
}

export function LinkCard({ link, index, total, error }: LinkCardProps) {
  const updateLink = useEditorStore((state) => state.updateLink);
  const removeLink = useEditorStore((state) => state.removeLink);
  const reorderLinks = useEditorStore((state) => state.reorderLinks);
  const [platformError, setPlatformError] = useState<string | null>(null);

  const handlePlatformChange = (platform: PlatformName) => {
    updateLink(link.id, { platform });
    setPlatformError(validatePlatformUrl(platform, link.url) ?? null);
  };

  useEffect(() => {
    setPlatformError(validatePlatformUrl(link.platform, link.url) ?? null);
  }, [link.platform, link.url]);

  const displayedError = error ?? platformError ?? undefined;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.reorderControls}>
            <button
              type="button"
              className={styles.moveButton}
              aria-label={`Move link ${index + 1} up`}
              disabled={index === 0}
              onClick={() => reorderLinks(link.id, "up")}
            >
              ↑
            </button>
            <button
              type="button"
              className={styles.moveButton}
              aria-label={`Move link ${index + 1} down`}
              disabled={index === total - 1}
              onClick={() => reorderLinks(link.id, "down")}
            >
              ↓
            </button>
          </div>
          <h3 className={styles.title}>Link #{index + 1}</h3>
        </div>
        <button
          type="button"
          className={styles.remove}
          onClick={() => removeLink(link.id)}
        >
          Remove
        </button>
      </div>

      <PlatformSelect
        id={`platform-${link.id}`}
        value={link.platform}
        onChange={handlePlatformChange}
      />

      <Input
        label="Link"
        name={`link-${link.id}`}
        value={link.url}
        placeholder="e.g. https://www.github.com/johnappleseed"
        error={displayedError}
        leadingIcon={<img src={linkIcon} alt="" className={styles.fieldIcon} />}
        onChange={(event) => updateLink(link.id, { url: event.target.value })}
      />
    </article>
  );
}
