import type { ChangeEvent } from "react";

import { Input } from "../../../../components/Input";
import { useEditorStore } from "../../../../store";
import styles from "./ProfileDetails.module.css";

interface ProfileDetailsProps {
  errors: Record<string, string | undefined>;
}

export function ProfileDetails({ errors }: ProfileDetailsProps) {
  const profile = useEditorStore((state) => state.profile);
  const updateProfile = useEditorStore((state) => state.updateProfile);
  const updateAvatar = useEditorStore((state) => state.updateAvatar);

  const handleAvatar = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.size > 1024 * 1024) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.profilePicture}>
        <span className={styles.profilePictureLabel}>Profile picture</span>
        <label className={styles.upload}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="Profile preview" className={styles.avatarPreview} />
          ) : (
            <>
              <span className={styles.imageIcon} aria-hidden="true">▧</span>
              <span className={styles.uploadText}>+ Upload Image</span>
            </>
          )}
          <input
            className={styles.fileInput}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleAvatar}
          />
        </label>
        <p className={styles.imageHint}>Image must be below 1024x1024px. Use PNG or JPG format.</p>
      </div>

      <div className={styles.fields}>
        <Input
          label="First name*"
          name="firstName"
          value={profile.firstName}
          placeholder="e.g. John"
          error={errors.firstName}
          onChange={(event) => updateProfile({ firstName: event.target.value })}
        />
        <Input
          label="Last name*"
          name="lastName"
          value={profile.lastName}
          placeholder="e.g. Appleseed"
          error={errors.lastName}
          onChange={(event) => updateProfile({ lastName: event.target.value })}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={profile.email}
          placeholder="e.g. email@example.com"
          error={errors.email}
          onChange={(event) => updateProfile({ email: event.target.value })}
        />
      </div>
    </div>
  );
}
