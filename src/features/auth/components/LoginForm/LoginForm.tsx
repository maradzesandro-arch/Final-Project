import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import envelopeIcon from "../../../../assets/envelope-icon.svg";
import lockIcon from "../../../../assets/lock-icon.svg";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import type { LoginCredentials } from "../../types";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSubmit?: (credentials: LoginCredentials) => void;
}

const loginSchema = yup.object({
  email: yup.string().trim().required("Can’t be empty").email("Please check again"),
  password: yup.string().required("Please check again"),
});

export function LoginForm({ onSubmit }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const submitLogin = (credentials: LoginCredentials) => {
    onSubmit?.(credentials);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitLogin)}
      noValidate
    >
      <Input
        label="Email address"
        type="email"
        placeholder="e.g. alex@email.com"
        autoComplete="email"
        error={errors.email?.message}
        leadingIcon={<img src={envelopeIcon} alt="" className={styles.fieldIcon} />}
        {...register("email")}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors.password?.message}
        leadingIcon={<img src={lockIcon} alt="" className={styles.fieldIcon} />}
        {...register("password")}
      />

      <Button variant="primary" fullWidth type="submit">
        Login
      </Button>
    </form>
  );
}
