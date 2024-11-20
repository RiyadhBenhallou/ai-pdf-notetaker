"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { createContext, ReactNode, useContext } from "react";

export const userInfoContext = createContext<{
  userInfo:
    | {
        _id: string;
        _creationTime: number;
        userName: string;
        email: string;
        imageUrl: string;
        credits: number;
      }
    | undefined;
  files:
    | {
        _id: string;
        _creationTime: number;
        fileUrl: string;
        storageId: string;
        fileName: string;
        createdBy: string;
      }[]
    | undefined;
}>({
  userInfo: undefined,
  files: undefined,
});

export const useUserInfo = () => {
  return useContext(userInfoContext);
};

export default function UserInfoProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = useUser();
  const userInfo = useQuery(api.user.getUserByEmail, {
    email: user?.primaryEmailAddress?.emailAddress as string,
  });
  const files = useQuery(api.fileStorage.getUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress as string,
  });
  return (
    <userInfoContext.Provider value={{ userInfo, files }}>
      {children}
    </userInfoContext.Provider>
  );
}
