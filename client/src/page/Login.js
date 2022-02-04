import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
});

export default function LogIn() {
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
      });
      const config = { headers: { "Content-Type": "application/json" } };

      const response = await axios.post(
        `${process.env.REACT_APP_DEVICE_URL}/users/signin`,
        userData,
        config
      );
      setReqError("");
      localStorage.setItem("jwt", response.data.jwt);
      document.cookie = `jwt=${response.data.jwt}`;
      navigate("/dashboard/app", { state: response.data.jwt });
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
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

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
