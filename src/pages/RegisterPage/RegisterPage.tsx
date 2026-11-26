import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import { RegisterForm } from "../../features/auth/components/RegisterForm";
import type { RegistrationCredentials } from "../../features/auth/types";
import { Logo } from "../../components/Logo";
import { useAuthStore } from "../../store";
import styles from "./RegisterPage.module.css";

export function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [submitError, setSubmitError] = useState<string>();

  useEffect(() => {
    if (isAuthenticated) navigate("/editor", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (credentials: RegistrationCredentials) => {
    const result = register(credentials.email);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitError(undefined);
    navigate("/editor", { replace: true });
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

          <RegisterForm onSubmit={handleSubmit} submitError={submitError} />

          <p className={styles.footer}>
            <span>Already have an account? </span>
            <button
              type="button"
              className={styles.link}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
