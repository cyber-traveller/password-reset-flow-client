/** @format */

import React, { useState } from "react";
import AxiosService from "../utils/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Container,
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

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    OTP: Yup.string().required("OTP Required"),
    password: Yup.string()
      .required("Password Required")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d).{12,}$/,
        "Password must be at least 12 characters and contain both letters and numbers" //Improved message
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password Required") //Improved message
      .oneOf([Yup.ref("password"), null], "Passwords must match"), //Improved message
  });

  const handleResetPassword = async (values) => {
    try {
      setLoading(true);

      const response = await AxiosService.post("/user/reset-password", values);

      if (response.data.message) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      navigate("/signin");
    } catch (error) {
      console.error("Reset Password Error:", error);
      let errorMessage = "Failed to reset password. Please try again.";

      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        errorMessage = error.response.data?.message || errorMessage;

        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (error.request) {
        console.error("Error Request:", error.request);
        errorMessage = "Network error. Please check your connection.";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
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
            Reset Password
          </Typography>
          <Typography component='p' variant='body2' align='center' sx={{ mt: 2, mb: 2 }}>
            Enter the OTP and set a new password.
          </Typography>
          <Formik
            initialValues={{ OTP: "", password: "", confirmPassword: "" }} // initialize Formik with empty strings
            validationSchema={validationSchema}
            onSubmit={handleResetPassword}
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
                    id='OTP'
                    label='OTP'
                    name='OTP'
                    error={touched.OTP && !!errors.OTP}
                    helperText={touched.OTP && errors.OTP}
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
                  <Field
                    as={TextField}
                    variant='outlined'
                    margin='normal'
                    required
                    fullWidth
                    name='confirmPassword'
                    label='Confirm Password'
                    type={showConfirmPassword ? "text" : "password"}
                    id='confirmPassword'
                    autoComplete='new-password'
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle confirm password visibility'
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            edge='end'
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
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
                      "Submit"
                    )}
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPasswordPage;