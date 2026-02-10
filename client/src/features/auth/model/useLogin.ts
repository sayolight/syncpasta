import { useState } from "react";
import { signIn } from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";
import { useNavigate } from "react-router";

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await signIn(data.email, data.password);
      setError(null);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, isLoading, error };
}
