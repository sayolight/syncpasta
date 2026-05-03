import { useState } from "react";
import { useNavigate } from "react-router";
import { signOut as signOutFirebase } from "@/shared/api/firebase/auth";

export function useSignOut() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signOut = () => {
    setLoading(true);
    signOutFirebase().then(() => {
      navigate("/");
    });
  };

  return { isLoading, signOut };
}
