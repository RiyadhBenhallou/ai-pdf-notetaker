"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashaboardPage() {
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
      redirect("/dashboard");
    }
    checkUser();
  }, [user, createUser]);

  return null;
}
