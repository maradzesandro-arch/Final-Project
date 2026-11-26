import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import envelopeIcon from "../../../../assets/envelope-icon.svg";
import lockIcon from "../../../../assets/lock-icon.svg";
import { Button } from "../../../../components/Button";
import { Input } from "../../../../components/Input";
import type { RegistrationCredentials } from "../../types";
import styles from "./RegisterForm.module.css";

interface RegisterFormProps {
  onSubmit?: (credentials: RegistrationCredentials) => void;
  submitError?: string;
}

const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Can’t be empty")
    .email("Please check again"),
  password: yup
    .string()
    .required("Please check again")
    .min(8, "Please check again"),
  confirmPassword: yup
    .string()
    .required("Please check again")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

export function RegisterForm({ onSubmit, submitError }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationCredentials>({
    resolver: yupResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const submitRegistration = (credentials: RegistrationCredentials) => {
    onSubmit?.(credentials);
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(submitRegistration)}
      noValidate
    >
      <Input
        label="Email address"
        type="email"
        placeholder="e.g. alex@email.com"
        autoComplete="email"
        error={errors.email?.message}
        leadingIcon={
          <img src={envelopeIcon} alt="" className={styles.fieldIcon} />
        }
        {...register("email")}
      />

      <Input
        label="Create password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.password?.message}
        leadingIcon={<img src={lockIcon} alt="" className={styles.fieldIcon} />}
        {...register("password")}
      />

      <Input
        label="Confirm password"
        type="password"
        placeholder="At least 8 characters"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        leadingIcon={<img src={lockIcon} alt="" className={styles.fieldIcon} />}
        {...register("confirmPassword")}
      />

      <p className={styles.passwordHint}>
        Password must contain at least 8 characters
      </p>

      {submitError ? (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      ) : null}

      <Button variant="primary" fullWidth type="submit">
        Create new account
      </Button>
    </form>
  );
}
