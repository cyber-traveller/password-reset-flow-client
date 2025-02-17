/** @format */

import React, { useState } from "react";
import AxiosService from "../utils/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Typography,
  Container,
  Paper,
} from "@mui/material";

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

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);

      const response = await AxiosService.post("/user/forgot-password", {
        email,
      });

      if (response.data.message) {
        toast.success(response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }

      navigate("/reset-password"); // Consider conditional navigation based on API response
    } catch (error) {
      console.error("Forgot Password Error:", error); // More descriptive logging
      let errorMessage =
        "Failed to send password reset email. Please try again.";

      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        errorMessage =
          error.response.data?.message || errorMessage; // Optional chaining

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
            Forgot Password
          </Typography>
          <Typography component='p' variant='body2' align='center' sx={{ mt: 2, mb: 2 }}>
            Enter your email address to receive a password reset link.
          </Typography>
          <Box
            component='form'
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={handleEmailChange}
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}
              onClick={handleForgotPassword}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color='secondary' /> : "Reset Password"}
            </Button>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="body2">
                    Remember your password? <Link to='/signin'>Sign in</Link>
                </Typography>
                <Typography variant="body2">
                    Don't have an account? <Link to='/signup'>Signup</Link>
                </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default ForgotPasswordPage;