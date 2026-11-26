import { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../../components/Button";
import { Header, type HeaderTab } from "../../components/Header";
import { LinksEditor } from "../../features/editor/components/LinksEditor";
import { PhonePreview } from "../../features/editor/components/PhonePreview";
import { ProfileDetails } from "../../features/editor/components/ProfileDetails";
import { useAuthStore, useEditorStore } from "../../store";
import { validatePlatformUrl } from "../../lib/platformValidation";
import styles from "./EditorPage.module.css";

interface LinkErrors {
  [linkId: string]: string | undefined;
}

export function EditorPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<HeaderTab>("links");
  const [linkErrors, setLinkErrors] = useState<LinkErrors>({});
  const [profileErrors, setProfileErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const links = useEditorStore((state) => state.links);
  const profile = useEditorStore((state) => state.profile);
  const setSaveStatus = useEditorStore((state) => state.setSaveStatus);
  const logout = useAuthStore((state) => state.logout);

  const validateLinks = () => {
    const nextErrors: LinkErrors = {};
    let valid = true;

    links.forEach((link) => {
      const error = validatePlatformUrl(link.platform, link.url);
      if (error) {
        nextErrors[link.id] = error;
        valid = false;
      }
    });

    setLinkErrors(nextErrors);
    return valid;
  };

  const validateProfile = () => {
    const nextErrors: Record<string, string | undefined> = {};
    let valid = true;

    if (!profile.firstName.trim()) {
      nextErrors.firstName = "Can’t be empty";
      valid = false;
    }
    if (!profile.lastName.trim()) {
      nextErrors.lastName = "Can’t be empty";
      valid = false;
    }
    if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      nextErrors.email = "Please check again";
      valid = false;
    }

    setProfileErrors(nextErrors);
    return valid;
  };

  const handleSave = () => {
    const linksValid = validateLinks();
    const profileValid = validateProfile();

    if (!linksValid || !profileValid) {
      setSaveStatus("error");
      setSaved(false);
      return;
    }

    setSaveStatus("saved");
    setSaved(true);
    window.setTimeout(() => {
      setSaved(false);
      setSaveStatus("idle");
    }, 3000);
  };

  return (
    <main className={styles.page}>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onPreview={() => navigate("/preview")}
        onLogout={() => {
          logout();
          navigate("/login", { replace: true });
        }}
      />

      <div className={styles.layout}>
        <aside className={styles.previewColumn} aria-label="Live phone preview">
          <PhonePreview />
        </aside>

        <section className={styles.editorColumn}>
          <div className={styles.editorBody}>
            {activeTab === "links" ? (
              <>
                <div className={styles.heading}>
                  <h1 className={styles.title}>Customize your links</h1>
                  <p className={styles.description}>
                    Add/edit/remove links below and then share all your profiles
                    with the world!
                  </p>
                </div>
                <LinksEditor errors={linkErrors} />
              </>
            ) : (
              <>
                <div className={styles.heading}>
                  <h1 className={styles.title}>Profile Details</h1>
                  <p className={styles.description}>
                    Add your details to create a personal touch to your profile.
                  </p>
                </div>
                <ProfileDetails errors={profileErrors} />
              </>
            )}
          </div>

          <footer className={styles.footer}>
            <Button
              variant="primary"
              type="button"
              onClick={handleSave}
              disabled={links.length === 0 && activeTab === "links"}
            >
              Save
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
            >
              Logout
            </Button>
          </footer>
        </section>
      </div>

      {saved ? (
        <div className={styles.toast} role="status">
          Your changes have been successfully saved!
        </div>
      ) : null}
    </main>
  );
}
