import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getAuth } from "@/shared/api/firebase";
import type { User } from "firebase/auth";

export default function Header() {
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header className="header">
      <Link to={{ pathname: "/" }}>
        <span className="header__logo">syncpasta</span>
        <span className="header__pathname">
          {" "}
          {"//"} {location.pathname.split("/")[1] || "main"}
        </span>
      </Link>
      <div className="header__nav">
        {user ? (
          <>
            <Link to={{ pathname: "/applications" }}>applications</Link>
            <Link to={{ pathname: "/gallery" }}>gallery</Link>
            <Link to={{ pathname: "/account" }}>account</Link>
          </>
        ) : (
          <Link to={{ pathname: "/auth" }}>auth</Link>
        )}
      </div>
    </header>
  );
}
