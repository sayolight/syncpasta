import { getAuth } from "@/shared/api/firebase";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export function AuthRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/auth");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return <Outlet />;
}
