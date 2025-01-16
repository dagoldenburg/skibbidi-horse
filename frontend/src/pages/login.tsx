import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from '@mui/material';

// Hardcoded credentials for demo
const DEMO_EMAIL = 'demo@example.com';
const DEMO_PASSWORD = 'demo123';
const DEMO_TOKEN = 'demo_auth_token_123';

export default function LoginPage() {
  const router = useRouter();
  const { redirect } = router.query;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already logged in
    const token = localStorage.getItem('auth_token');
    if (token) {
      router.push(redirect as string || '/');
    }
  }, [redirect, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        localStorage.setItem('auth_token', DEMO_TOKEN);
        router.push(redirect as string || '/');
      } else {
        setError('Ogiltig e-postadress eller lösenord');
        setIsLoading(false);
      }
    }, 1000);
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
            Välkommen tillbaka
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

        <form onSubmit={handleSubmit}>
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