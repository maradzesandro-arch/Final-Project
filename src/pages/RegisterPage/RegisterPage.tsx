import type { JSX } from "react";

import { RegisterForm } from "../../features/auth/components/RegisterForm";
import type { RegistrationCredentials } from "../../features/auth/types";
import { Logo } from "../../components/Logo";
import styles from "./RegisterPage.module.css";

export function RegisterPage(): JSX.Element {
  const handleSubmit = (_credentials: RegistrationCredentials) => {
    // Authentication is intentionally deferred until a later phase.
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Logo size="large" showText alt="Devlinks" />

        <section className={styles.card} aria-labelledby="register-title">
          <div className={styles.heading}>
            <h1 className={styles.title} id="register-title">
              Create account
            </h1>
            <p className={styles.description}>
              Let’s get you started sharing your links!
            </p>
          </div>

          <RegisterForm onSubmit={handleSubmit} />

          <p className={styles.footer}>
            <span>Already have an account? </span>
            <button type="button" className={styles.link}>
              Login
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
