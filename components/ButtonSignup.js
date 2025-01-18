import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import {Button, TextField} from "@mui/material";

const ButtonSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Vänligen ange en giltig e-postadress");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Lösenorden matchar inte");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data) {
        console.log("data " + JSON.stringify(data));
        toast.success("Check your emails to confirm your account!");
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form-control w-full space-y-4" onSubmit={handleSignup}>
      <TextField
          fullWidth
          label="E-postadress"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          required
          error={!!emailError}
          helperText={emailError}
      />

      <TextField
          fullWidth
          label="Lösenord"
          autoComplete="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
          required
          error={!!passwordError}
      />

      <TextField
          fullWidth
          label="Lösenord igen"
          autoComplete="new-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ mb: 3 }}
          required
          error={!!passwordError}
          helperText={passwordError}
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
        {isLoading && (
            <span className="loading loading-spinner loading-xs"></span>
        )}
        Registrera
      </Button>
    </form>
  );
};

export default ButtonSignup; 