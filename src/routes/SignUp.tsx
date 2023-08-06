import { Button, TextField } from "@mui/material";
import styles from "./SignUp.module.scss";
import { Controller, useForm } from "react-hook-form";
import { userService } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const SignUp = () => {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    userService
      .signUp(data.username, data.password)
      .then(() => setApiError(""))
      .catch((e) => setApiError(e.response.data.message));
  };

  return (
    <div className={styles.signUpContainer}>
      <h1>Sign up</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Username"
              variant="outlined"
              autoComplete="off"
              error={errors.username ? true : false}
              helperText={errors.username ? "Please enter a username" : ""}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true, minLength: 8 }}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              error={errors.password ? true : false}
              helperText={
                errors.password
                  ? "Please enter a valid password"
                  : "Password must be at least 8 characters"
              }
              {...field}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            validate: (value) => value === watch("password"),
          }}
          render={({ field }) => (
            <TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              error={errors.confirmPassword ? true : false}
              helperText={
                errors.confirmPassword ? "Passwords do not match" : ""
              }
              {...field}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Sign up
        </Button>
        <p className={styles.navigateAccount}>
          Already have an account?{" "}
          <span
            className={styles.navigateText}
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
        {apiError && <p className={styles.error}>{apiError}</p>}
      </form>
    </div>
  );
};
