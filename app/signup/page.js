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
import ButtonSignup from "@/components/ButtonSignup";


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
              Registrering till {config.appName}
            </Typography>
            <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#6b7280',
                }}
            >
              Registrera dig för att se AI-analyser för V75 och V86
            </Typography>
          </Box>
            <ButtonSignup/>
        </Paper>
      </Container>
  );
}