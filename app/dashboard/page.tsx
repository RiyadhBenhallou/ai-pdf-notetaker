"use client";
import { useUserInfo } from "@/context/userInfoContext";
import EmptyState from "./_components/empty-state";
import FileCard from "./_components/file-card";
import UploadButton from "./_components/upload-button";

export default function DashaboardPage() {
  // const [isPending, startTransition] = useTransition()
  // const { user } = useUser();
  // // if (!user) return;
  // const userFiles = useQuery(api.fileStorage.getUserFiles, {
  //   createdBy: user?.primaryEmailAddress?.emailAddress as string,
  // });
  const { files, userInfo } = useUserInfo();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl mb-6">Workspace</h1>
        <div className="">
          <UploadButton
            nbrOfFiles={files?.length || 0}
            userCredits={userInfo?.credits || 0}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {files?.map((file) => <FileCard key={file._id} {...file} />)}
      </div>
      {files?.length === 0 && <EmptyState />}
    </div>
  );
}
