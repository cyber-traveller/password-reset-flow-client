/** @format */

import React, { useState } from "react";
import AxiosService from "../utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    error: {
      main: "#f44336",
    },
  },
});

const Signin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).{12,}$/,
        "Password must be at least 12 characters and contain both letters and numbers"
      ),
  });

  const handleSignin = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/signin", values);

      const { message, token, userData } = response.data;

      if (message) {
        toast.success(message, {
          position: toast.POSITION.TOP_CENTER,
        });
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userData", JSON.stringify(userData));
        navigate("/home");
      }
    } catch (error) {
      console.error(error); // Log the entire error object for debugging
      let errorMessage = "Failed to sign in. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error Response Data:", error.response.data);
        console.error("Error Response Status:", error.response.status);

        if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message; // Use the message from the backend if available
        }

        if (error.response.status === 401 || error.response.status === 404) {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
        errorMessage = "Network error. Please check your connection.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error Message:", error.message);
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component='main' maxWidth='xs'>
        <Paper
          elevation={3}
          sx={{
            marginTop: 8,
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignin}
          >
            {({ errors, touched }) => (
              <Form style={{ width: "100%", marginTop: 1 }}>
                <Box sx={{ mt: 1 }}>
                  <Field
                    as={TextField}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    autoFocus
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />

                  <Field
                    as={TextField}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type={showPassword ? "text" : "password"}
                    id='password'
                    autoComplete='current-password'
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                            edge='end'
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color='secondary' />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to='/forgot-password' variant='body2'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link to='/signup' variant='body2'>
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Signin;