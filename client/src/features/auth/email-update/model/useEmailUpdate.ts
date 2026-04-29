import { useState } from "react";
import * as firebase from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";

export function useEmailUpdate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();

  const emailUpdate = async (email: string) => {
    try {
      setLoading(true);
      await firebase.verifyBeforeUpdateEmail(email);
      setError(null);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return { emailUpdate, isLoading, error };
}
