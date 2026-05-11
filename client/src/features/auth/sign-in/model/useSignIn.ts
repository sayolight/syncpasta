import * as firebase from "@/shared/api/firebase";
import { useMutation } from "@tanstack/react-query";

async function signIn(data: { email: string; password: string }) {
  await firebase.signIn(data.email, data.password);
}

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
