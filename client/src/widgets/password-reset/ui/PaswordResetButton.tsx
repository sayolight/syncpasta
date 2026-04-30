import { Link } from "react-router";
import { Button } from "@ui/button";

export default function PasswordResetButton() {
  return (
    <Link to={{ pathname: "/account/password-reset" }}>
      <Button>reset password</Button>
    </Link>
  );
}
