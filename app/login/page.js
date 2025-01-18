'use client' 
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import config from "@/config";


// Hardcoded credentials for demo
const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_TOKEN = 'demo_auth_token_123';


export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSignIn = async (e, options) => {
    e?.preventDefault();
    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/api/auth/callback";

      if (type === "password") {
        await supabase.auth.signInWithPassword({email: email, password: password})
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <Container maxWidth="sm" sx={{ py: 8 }}>

        <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  fontWeight: 700,
                  color: '#1f2937',
                  mb: 1,
                }}
            >
              Välkommen till {config.appName}
            </Typography>
            <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}
            >
              Logga in för att se AI-analyser för V75 och V86
            </Typography>
          </Box>

          <form onSubmit={(e) => handleSignIn(e, {type: "password"})}>
            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="E-postadress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
                required
            />

            <TextField
                fullWidth
                label="Lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 3 }}
                required
            />

            <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{
                  py: 1.5,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                  },
                }}
            >
              {isLoading ? 'Loggar in...' : 'Logga in'}
            </Button>

            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography
                  sx={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                  }}
              >
                Demo credentials: {DEMO_EMAIL} / {DEMO_PASSWORD}
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
  );
}