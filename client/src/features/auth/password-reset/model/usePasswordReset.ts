import { useState } from "react";
import * as firebase from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";

export function usePasswordReset() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);

  const sendPasswordResetEmail = async (email: string) => {
    try {
      setLoading(true);
      setSuccess(false);
      await firebase.sendPasswordResetEmail(email);
      setError(null);
      setSuccess(true);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return { sendPasswordResetEmail, isLoading, error, success };
}
