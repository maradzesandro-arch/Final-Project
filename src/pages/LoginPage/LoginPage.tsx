import type { JSX } from "react";

import { LoginForm } from "../../features/auth/components/LoginForm";
import type { LoginCredentials } from "../../features/auth/types";
import { Logo } from "../../components/Logo";
import styles from "./LoginPage.module.css";

export function LoginPage(): JSX.Element {
  const handleSubmit = (_credentials: LoginCredentials) => {
    // Authentication is intentionally deferred until a later phase.
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Logo size="large" showText alt="Devlinks" />

        <section className={styles.card} aria-labelledby="login-title">
          <div className={styles.heading}>
            <h1 className={styles.title} id="login-title">
              Login
            </h1>
            <p className={styles.description}>
              Add your details below to get back into the app
            </p>
          </div>

          <LoginForm onSubmit={handleSubmit} />

          <p className={styles.footer}>
            <span>Don’t have an account? </span>
            <button type="button" className={styles.link}>
              Create account
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
