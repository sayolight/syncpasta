import * as firebase from "@/shared/api/firebase";
import { useMutation } from "@tanstack/react-query";

async function emailUpdate(email: string) {
  await firebase.verifyBeforeUpdateEmail(email);
}

export function useEmailUpdate() {
  return useMutation({
    mutationFn: emailUpdate,
  });
}
