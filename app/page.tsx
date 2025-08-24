'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios, { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default function LoginPage() {
  const [username, setUsername] = useState('admin'); // Changed from email to username
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error.response?.data?.error || 'Login failed');
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <Toaster />
        <Card className="w-full max-w-md shadow-2xl border-0" sx={{ minHeight: '600px' }}>
          <CardContent className="p-10">
            {/* Logo Section */}
            <Box className="flex flex-col items-center mb-12">
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  {/* Placeholder for logo */}
                </div>
              </div>
              <Typography
                variant="h5"
                className="text-gray-700 font-semibold text-center"
                sx={{ fontSize: '1.5rem', fontWeight: 600 }}
              >
                Welcome to The Fearless Movement
              </Typography>
            </Box>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Username Field */}
              <TextField
                fullWidth
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '56px',
                    backgroundColor: '#f8fafc',
                    '&:hover': { backgroundColor: '#f1f5f9' },
                    '&.Mui-focused': { backgroundColor: '#ffffff' },
                  },
                }}
              />

              {/* Password Field */}
              <div className="pt-4">
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-gray-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePassword}
                          edge="end"
                          aria-label="toggle password visibility"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      height: '56px',
                      backgroundColor: '#f8fafc',
                      '&:hover': { backgroundColor: '#f1f5f9' },
                      '&.Mui-focused': { backgroundColor: '#ffffff' },
                    },
                  }}
                />
              </div>

              {/* Forgot Password Link */}
              <Box className="flex justify-end pt-2">
                <Link
                  href="/forgot-password"
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors"
                  underline="none"
                >
                  Forgot Password?
                </Link>
              </Box>

              {/* Sign In Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
                  sx={{
                    textTransform: 'none',
                    height: '52px',
                    backgroundColor: '#1976d2',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  {isLoading ? 'Signing In...' : 'SIGN IN'}
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <Box className="mt-10 text-center">
              <Typography variant="body2" className="text-gray-600">
                Don't have an account yet?{' '}
                <Link
                  href="/signup"
                  className="text-purple-600 hover:text-purple-800 font-semibold transition-colors"
                  underline="none"
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>

            {/* Portal Access */}
            <Box className="mt-6 text-center">
              <Typography variant="body2" className="text-gray-500">
                Access The Fearless Movement Members Portal
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}