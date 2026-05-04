import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getAuth } from "@/shared/api/firebase";
import type { User } from "firebase/auth";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
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
            <Link to={{ pathname: "/applications" }}>
              {t("header.applications")}
            </Link>
            <Link to={{ pathname: "/gallery" }}>{t("header.gallery")}</Link>
            <Link to={{ pathname: "/account" }}>{t("header.account")}</Link>
          </>
        ) : (
          <Link to={{ pathname: "/auth" }}>{t("header.auth")}</Link>
        )}
      </div>
    </header>
  );
}
