import { useState } from "react";
import * as firebase from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";
import { useNavigate } from "react-router";

export function useSignIn() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const signIn = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await firebase.signIn(data.email, data.password);
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

  return { signIn, isLoading, error };
}
