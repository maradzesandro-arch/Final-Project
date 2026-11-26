import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";

import { LoginForm } from "../../features/auth/components/LoginForm";
import type { LoginCredentials } from "../../features/auth/types";
import { Logo } from "../../components/Logo";
import { useAuthStore } from "../../store";
import styles from "./LoginPage.module.css";

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [submitError, setSubmitError] = useState<string>();

  const handleSubmit = (credentials: LoginCredentials) => {
    const result = login(credentials.email);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }

    setSubmitError(undefined);
    navigate("/editor", { replace: true });
  };

  // Redirect authenticated users away from Login
  useEffect(() => {
    if (isAuthenticated) navigate("/editor", { replace: true });
  }, [isAuthenticated, navigate]);

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

          <LoginForm onSubmit={handleSubmit} submitError={submitError} />

          <p className={styles.footer}>
            <span>Don’t have an account? </span>
            <button
              type="button"
              className={styles.link}
              onClick={() => navigate("/register")}
            >
              Create account
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
