// modules
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// material ui
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

let schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  number: yup.string().required().min(10),
});

export default function SignUp() {
  const navigate = useNavigate();
  const [reqError, setReqError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const userData = JSON.stringify({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        number: data.number,
      });
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        `${process.env.REACT_APP_DEVICE_URL}/users/signup`,
        userData,
        config
      );
      setReqError("");
      navigate("/login");
    } catch (error) {
      setReqError(error.response.data.errors[0].message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName", { required: true })}
                />
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  component="p"
                  color={"error"}
                  variant="p"
                >
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  {...register("lastName", { required: true })}
                />
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  component="p"
                  color={"error"}
                  variant="p"
                >
                  {errors.lastName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                />
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  component="p"
                  color={"error"}
                  variant="p"
                >
                  {errors.email?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", { required: true })}
                />
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  component="p"
                  color={"error"}
                  variant="p"
                >
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="number"
                  label="Contact Number"
                  type="number"
                  id="number"
                  autoComplete="number"
                  {...register("number", { required: true })}
                />
                <Typography
                  sx={{ textTransform: "capitalize" }}
                  component="p"
                  color={"error"}
                  variant="p"
                >
                  {errors.number?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {reqError ? (
              <Typography
                sx={{ textTransform: "capitalize" }}
                component="p"
                color={"error"}
                variant="p"
              >
                {reqError}
              </Typography>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
