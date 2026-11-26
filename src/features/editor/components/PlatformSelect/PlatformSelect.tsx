import type { PlatformName } from "../../../../types";
import styles from "./PlatformSelect.module.css";

const platforms: PlatformName[] = [
  "GitHub",
  "YouTube",
  "LinkedIn",
  "Facebook",
  "Frontend Mentor",
  "Twitter",
  "Instagram",
  "Twitch",
  "Dev.to",
  "Codewars",
  "CodePen",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

interface PlatformSelectProps {
  value: PlatformName;
  onChange: (platform: PlatformName) => void;
  id: string;
}

export function PlatformSelect({ value, onChange, id }: PlatformSelectProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>Platform</label>
      <select
        id={id}
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as PlatformName)}
      >
        {platforms.map((platform) => (
          <option key={platform} value={platform}>{platform}</option>
        ))}
      </select>
    </div>
  );
}
