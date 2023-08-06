import { Button, TextField } from "@mui/material";
import styles from "./SignUp.module.scss";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import { useState } from "react";

export const Login = () => {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: { username: string; password: string }) => {
    userService
      .login(data.username, data.password)
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
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              error={errors.password ? true : false}
              helperText={errors.password ? "Please enter a password" : ""}
              {...field}
            />
          )}
        />
        <Button type="submit" variant="contained">
          Login
        </Button>
        <p className={styles.navigateAccount}>
          Don't have an account?{" "}
          <span className={styles.navigateText} onClick={() => navigate("/")}>
            Sign up here
          </span>
        </p>
        {apiError && <p className={styles.error}>{apiError}</p>}
      </form>
    </div>
  );
};
