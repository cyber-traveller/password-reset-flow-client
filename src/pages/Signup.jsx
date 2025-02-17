/** @format */

import React, { useState } from "react";
import AxiosService from "../utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form } from "formik";
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
  Paper,
  Grid,
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

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name Required"), // Corrected message
    lastName: Yup.string().required("Last Name Required"), // Corrected message
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).{12,}$/,
        "Password must be at least 12 characters and contain both letters and numbers" // Improved message
      ),
  });

  const handleSignup = async (values) => {
    try {
      setLoading(true);
      const response = await AxiosService.post("/user/signup", values);
      const { message } = response.data;

      toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/signin");
    } catch (error) {
      console.error("Signup Error:", error); // More informative logging
      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error Response Data:", error.response.data);
        errorMessage =
          error.response.data?.message || errorMessage; // Optional chaining

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
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
            Sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
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
                    id='firstName'
                    label='First Name'
                    name='firstName'
                    autoFocus
                    error={touched.firstName && !!errors.firstName}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Field
                    as={TextField}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    error={touched.lastName && !!errors.lastName}
                    helperText={touched.lastName && errors.lastName}
                  />
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
                    autoComplete='new-password'
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
                      "Sign Up"
                    )}
                  </Button>
                  <Grid container justifyContent='flex-end'>
                    <Grid item>
                      <Link to='/signin' variant='body2'>
                        Already have an account? Sign in
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

export default Signup;