"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import toast from "react-hot-toast";
import config from "@/config";
import { useRouter } from 'next/navigation';
import ButtonSignup from "@/components/ButtonSignup";

// This a login/singup page for Supabase Auth.
// Successfull login redirects to /api/auth/callback where the Code Exchange is processed (see app/api/auth/callback/route.js).
export default function Login() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [magicEmail, setMagicEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e, options) => {
    e?.preventDefault();

    setIsLoading(true);

    try {
      const { type, provider } = options;
      const redirectURL = window.location.origin + "/api/auth/callback";

      if (type === "oauth") {
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: redirectURL,
          },
        });
      } else if (type === "magic_link") {
        console.log(`sending otp to ${magicEmail}`)
        await supabase.auth.signInWithOtp({
          email: magicEmail,
          options: {
            emailRedirectTo: redirectURL,
          },
        }
        );

        toast.success("Check your emails!");

        setIsDisabled(true);
      } else if (type === "password") {
      await supabase.auth.signInWithPassword({email: email, password: password})
      router.push('/dashboard');
    }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <main className="p-8 md:p-24" data-theme={config.colors.theme}>
        <div className="text-center mb-4">
          <Link href="/" className="btn btn-ghost btn-sm">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
            >
              <path
                  fillRule="evenodd"
                  d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
                  clipRule="evenodd"
              />
            </svg>
            Home
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
          Sign-in to {config.appName}{" "}
        </h1>
        <div className="space-y-8 max-w-xl mx-auto">
          <form
              className="form-control w-full space-y-4"
              onSubmit={(e) => handleSignIn(e, {type: "password"})}
          >
            <input
                required
                type="email"
                value={email}
                autoComplete="email"
                placeholder="E-mail"
                className="input input-bordered w-full placeholder:opacity-60"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                required
                type="password"
                value={password}
                autoComplete="current-password"
                placeholder="password"
                className="input input-bordered w-full placeholder:opacity-60"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="btn btn-primary btn-block"
                disabled={isLoading || isDisabled}
                type="submit"
            >
              {isLoading && (
                  <span className="loading loading-spinner loading-xs"></span>
              )}
              Log in
            </button>
          </form>
          <div className="divider text-xs text-base-content/50 font-medium">
            OR
          </div>
          <ButtonSignup/>
        </div>
      </main>
  );
}
