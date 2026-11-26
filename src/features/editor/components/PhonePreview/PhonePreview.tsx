import { useEditorStore } from "../../../../store";
import type { Link } from "../../../../types";
import styles from "./PhonePreview.module.css";

const platformColors: Partial<Record<Link["platform"], string>> = {
  GitHub: "#1A1A1A",
  YouTube: "#EE3939",
  LinkedIn: "#2D68FF",
  Facebook: "#2D68FF",
};

export function PhonePreview() {
  const profile = useEditorStore((state) => state.profile);
  const links = useEditorStore((state) => state.links);
  const name = [profile.firstName, profile.lastName].filter(Boolean).join(" ");

  return (
    <div className={styles.preview}>
      <div className={styles.phone}>
        <div className={styles.profile}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" className={styles.avatar} />
          ) : (
            <div className={styles.avatarPlaceholder} />
          )}
          <div className={styles.profileText}>
            <strong className={styles.name}>{name || ""}</strong>
            {profile.email ? <span className={styles.email}>{profile.email}</span> : null}
          </div>
        </div>

        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.id}
              className={styles.link}
              style={{ background: platformColors[link.platform] ?? "#633CFF" }}
              href={link.url || undefined}
              target="_blank"
              rel="noreferrer"
            >
              <span>{link.platform}</span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
