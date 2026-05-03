import { useState } from "react";
import * as firebase from "@/shared/api/firebase";
import { FirebaseError } from "@firebase/app";
import { useNavigate } from "react-router";

export function useEmailUpdate() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const emailUpdate = async (email: string) => {
    try {
      setLoading(true);
      setSuccess(false);
      await firebase.verifyBeforeUpdateEmail(email);
      setError(null);
      setSuccess(true);
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/requires-recent-login") {
          navigate("/auth?redirect_to=account");
          // TODO: return a "you should re-auth to update email" message to user
        }
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return { emailUpdate, isLoading, error, success };
}
