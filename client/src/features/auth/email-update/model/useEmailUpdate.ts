import { useState } from "react";
import * as firebase from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";

export function useEmailUpdate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);

  const emailUpdate = async (email: string) => {
    try {
      setLoading(true);
      setSuccess(false);
      await firebase.verifyBeforeUpdateEmail(email);
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

  return { emailUpdate, isLoading, error, success };
}
