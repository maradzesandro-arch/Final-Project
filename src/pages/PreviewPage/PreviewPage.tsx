import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { PhonePreview } from "../../features/editor/components/PhonePreview";
import { useAuthStore, useEditorStore } from "../../store";
import styles from "./PreviewPage.module.css";

export function PreviewPage(): JSX.Element {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const profile = useEditorStore((state) => state.profile);
  const links = useEditorStore((state) => state.links);

  const hasProfile = Boolean(
    profile.firstName.trim() || profile.lastName.trim() || profile.email.trim(),
  );

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className={styles.page}>
      <header className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/editor")}
          >
            Back to Editor
          </Button>
          <div className={styles.actions}>
            <Button variant="primary" type="button" onClick={handleShare}>
              Share Link
            </Button>
            <Button variant="secondary" type="button" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className={styles.content}>
        {!hasProfile && links.length === 0 ? (
          <div className={styles.empty}>
            <h1>No profile or links yet</h1>
            <p>
              Add profile details and links in the Editor to publish your page.
            </p>
          </div>
        ) : (
          <PhonePreview />
        )}
      </div>
    </main>
  );
}
