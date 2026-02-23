import { Link, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();

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
        <Link to={{ pathname: "/applications" }}>applications</Link>
        <Link to={{ pathname: "/gallery" }}>gallery</Link>
        <Link to={{ pathname: "/auth" }}>account</Link>
      </div>
    </header>
  );
}
