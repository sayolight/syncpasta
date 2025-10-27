"use client";
import { Block } from "@/components/Block";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Text } from "@/components/Text";
import { auth, firebaseApp } from "@/lib/firebase/clientApp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState, useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Auth() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user] = useAuthState(auth);
  const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    if (user) {
      redirect("/account");
    }
  }, [user]);

  const handleLogin = async () => {
    signInUserWithEmailAndPassword(loginEmail, loginPassword);
  };

  const handleRegister = async () => {
    // Handle registration logic
  };

  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      <Block>
        <Text weight="bold">Login</Text>
        <Input title="Email" type="email" placeholder="user@email.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
        <Input title="Password" type="password" placeholder="********" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
        <Button className="w-full mt-2" variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Block>
      <Text variant="muted" className="text-center">
        - or -
      </Text>
      <Block>
        <Text weight="bold">Register</Text>
        <Input title="Email" type="email" placeholder="user@email.com" />
        <Input title="Password" type="password" placeholder="********" />
        <Input
          title="Confirm Password"
          type="password"
          placeholder="********"
        />
        <Button className="w-full mt-2" variant="primary">
          Register
        </Button>
      </Block>
    </div>
  );
}
