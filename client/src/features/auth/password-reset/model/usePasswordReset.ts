import * as firebase from "@/shared/api/firebase";
import { useMutation } from "@tanstack/react-query";

async function passwordReset(email: string) {
  await firebase.sendPasswordResetEmail(email);
}

export function usePasswordReset() {
  return useMutation({
    mutationFn: passwordReset,
  });
}
