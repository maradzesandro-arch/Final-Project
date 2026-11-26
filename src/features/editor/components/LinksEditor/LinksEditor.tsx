import { Button } from "../../../../components/Button";
import { useEditorStore } from "../../../../store";
import { LinkCard } from "../LinkCard";
import styles from "./LinksEditor.module.css";

interface LinksEditorProps {
  errors: Record<string, string | undefined>;
}

export function LinksEditor({ errors }: LinksEditorProps) {
  const links = useEditorStore((state) => state.links);
  const addLink = useEditorStore((state) => state.addLink);

  return (
    <div className={styles.editor}>
      <Button variant="secondary" fullWidth type="button" onClick={addLink}>
        + Add new link
      </Button>

      {links.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIllustration} aria-hidden="true">
            <div className={styles.phone}>
              <div className={styles.hand} />
            </div>
          </div>
          <h3 className={styles.emptyTitle}>Let’s get you started</h3>
          <p className={styles.emptyDescription}>
            Use the “Add new link” button to get started. Once you have more than
            one link, you can reorder and edit them. We’re here to help you share
            your profiles with everyone!
          </p>
        </div>
      ) : (
        <div className={styles.cards}>
          {links.map((link, index) => (
            <LinkCard
              key={link.id}
              link={link}
              index={index}
              total={links.length}
              error={errors[link.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
