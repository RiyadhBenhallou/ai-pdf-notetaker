"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    async function checkUser() {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress as string,
        userName: user?.fullName as string,
        imageUrl: user?.imageUrl as string,
      });
      console.log(result);
    }
    if (user) {
      checkUser();
    }
  }, [user, createUser]);
  return (
    <div className="">
      <SignedIn>
        <h1>hello user</h1>
        <Button asChild>
          <SignOutButton>sign out</SignOutButton>
        </Button>
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <SignInButton>sign in</SignInButton>
        </Button>
      </SignedOut>
    </div>
  );
}
