import { useState } from "react";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const ButtonSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
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
      <input
        required
        type="email"
        value={email}
        autoComplete="email"
        placeholder="Email"
        className="input input-bordered w-full placeholder:opacity-60"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="password"
        value={password}
        autoComplete="new-password"
        placeholder="Password"
        className="input input-bordered w-full placeholder:opacity-60"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-primary btn-block"
        disabled={isLoading}
        type="submit"
      >
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Sign up
      </button>
    </form>
  );
};

export default ButtonSignup; 