import type { JSX } from "react";

import styles from "./App.module.css";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

function App(): JSX.Element {
  return (
    <main className={styles.app}>
      <h1 className={styles.previewTitle}>Authentication Pages</h1>
      <div className={styles.previewGrid}>
        <section className={styles.previewItem} aria-label="Login page preview">
          <h2 className={styles.previewLabel}>Login</h2>
          <LoginPage />
        </section>
        <section
          className={styles.previewItem}
          aria-label="Register page preview"
        >
          <h2 className={styles.previewLabel}>Create Account</h2>
          <RegisterPage />
        </section>
      </div>
    </main>
  );
}

export default App;
