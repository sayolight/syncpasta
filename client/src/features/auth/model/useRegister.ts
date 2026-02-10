import { useState } from "react";
// import { useNavigate } from "react-router";
import { FirebaseError } from "@firebase/app";

// TODO: register user
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const [error, setError] = useState<string | null>();

  const register = async () => {
    try {
      setLoading(true);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return { register, isLoading, error };
}
