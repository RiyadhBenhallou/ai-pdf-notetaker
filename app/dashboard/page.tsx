"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import EmptyState from "./_components/empty-state";
import FileCard from "./_components/file-card";
import UploadButton from "./_components/upload-button";
import { useEffect } from "react";

export default function DashaboardPage() {
  const { user } = useUser();
  const files = useQuery(api.fileStorage.getUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress as string,
  });
  const userInfo = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
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
  // const createUser = useMutation(api.user.createUser);

  // useEffect(() => {
  //   async function checkUser() {
  //     const result = await createUser({
  //       email: user?.primaryEmailAddress?.emailAddress as string,
  //       userName: user?.fullName as string,
  //       imageUrl: user?.imageUrl as string,
  //     });
  //     console.log(result);
  //   }
  //   if (user) {
  //     checkUser();
  //   }
  // }, [user, createUser]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <div className="">
          <UploadButton
            nbrOfFiles={files?.length || 0}
            userCredits={userInfo?.credits || 0}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {files?.map((file) => <FileCard key={file._id} {...file} />)}
      </div>
      {files?.length === 0 && <EmptyState />}
    </div>
  );
}
