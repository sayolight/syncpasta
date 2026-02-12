import { useState } from "react";
import { FirebaseError } from "@firebase/app";
import * as firebase from "@/shared/api/firebase";
import { useNavigate } from "react-router";

export function useSignUp() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const signUp = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await firebase.signUp(data.email, data.password);
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

  return { signUp, isLoading, error };
}
