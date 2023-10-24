import { Container, Box, Grid, TextField, Button, Link } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IAuthForm } from "../../models/IAuthForm";
import { login, register } from "../../api/services/account";
import VerifyEmail from "../../components/VerifyEmail/VerifyEmail";

const Auth = () => {
  const [registerMode, setRegisterMode] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<IAuthForm>();

  const onSubmit = (e: IAuthForm) => {
    if (registerMode && e.password != e.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Password and Confirm Password should be same",
      });
      return;
    }
    if (registerMode) {
      register(e)
        .then(() => {
          setEmailAlert(true);
          reset(initialValues);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      login({ email: e.email, password: e.password });
    }
    console.log(e);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    console.log(errors);
  };

  const handleRegisterToggle = () => {
    setRegisterMode((prev) => !prev);
    reset(initialValues);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // height: "100vh",
        }}
      >
        {emailAlert ? (
          <VerifyEmail />
        ) : (
          <>
            {" "}
            <img src="/512-black.png" alt="logo" width="100" height="100" />
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmit, onError)}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                {registerMode && (
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Name is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Name"
                          fullWidth
                          error={Boolean(errors.name)}
                          helperText={errors.name?.message}
                          autoComplete="given-name"
                        />
                      )}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        message: "Invalid Email",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        fullWidth
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                        autoComplete="email"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password should be atleast 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Password"
                        fullWidth
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                        autoComplete="new-password"
                      />
                    )}
                  />
                </Grid>

                {registerMode && (
                  <Grid item xs={12}>
                    <Controller
                      name="confirmPassword"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Confirm Password is required",
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Confirm Password"
                          fullWidth
                          error={Boolean(errors.confirmPassword)}
                          helperText={errors.confirmPassword?.message}
                          autoComplete="new-password"
                        />
                      )}
                    />
                  </Grid>
                )}

                {registerMode && (
                  <Grid item xs={12}>
                    <Controller
                      name="mobile"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Mobile Number is required",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Invalid Mobile Number",
                        },
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mobile Number"
                          fullWidth
                          error={Boolean(errors.mobile)}
                          helperText={errors.mobile?.message}
                          autoComplete="tel"
                        />
                      )}
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {registerMode ? "Sign Up" : "Sign In"}
              </Button>
              <Grid
                container
                justifyContent="flex-end"
                sx={{ cursor: "pointer" }}
              >
                <Grid item>
                  <Link onClick={handleRegisterToggle} variant="body2">
                    {registerMode
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {!registerMode && (
                <Grid
                  container
                  justifyContent="flex-end"
                  sx={{ cursor: "pointer", mt: 1 }}
                >
                  <Grid item>
                    <Link variant="body2">Forgot Password?</Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Auth;
