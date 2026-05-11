import * as firebase from "@/shared/api/firebase";
import { useMutation } from "@tanstack/react-query";

async function signUp(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  if (data.email && data.password && data.password !== data.confirmPassword) {
    throw { code: "auth/passwords-dont-match" };
  }
  await firebase.signUp(data.email, data.password);
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
