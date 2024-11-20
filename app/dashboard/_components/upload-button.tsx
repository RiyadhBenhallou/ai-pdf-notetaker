import { Button } from "@/components/ui/button";
import UploadingDialog from "./uploading-dialog";
import { Loader2, Plus } from "lucide-react";

export default function UploadButton({
  nbrOfFiles: nbrOfFiles,
  userCredits: userCredits,
}: {
  nbrOfFiles: number;
  userCredits: number;
}) {
  return (
    <UploadingDialog>
      <Button
        className="justify-center w-full"
        disabled={nbrOfFiles >= userCredits}
      >
        {nbrOfFiles && userCredits ? (
          <Plus className="w-4 h-4" />
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        Upload PDF
      </Button>
    </UploadingDialog>
  );
}
