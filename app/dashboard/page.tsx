"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import FileCard from "./_components/file-card";
import EmptyState from "./_components/empty-state";

export default function DashaboardPage() {
  // const [isPending, startTransition] = useTransition()
  const { user } = useUser();
  // if (!user) return;
  const userFiles = useQuery(api.fileStorage.getUserFiles, {
    createdBy: user?.primaryEmailAddress?.emailAddress as string,
  });

  // useEffect(() => {
  //   startTransition(async () => {
  //     await getUserFiles()
  //   }
  // }, [])
  return (
    <div>
      <h1 className="font-bold text-2xl mb-6">Workspace</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {userFiles?.map((file) => <FileCard key={file._id} {...file} />)}
      </div>
      {userFiles?.length === 0 && <EmptyState />}
    </div>
  );
}
