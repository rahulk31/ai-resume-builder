import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createNewResume, getResumeById } from "./../../../../service/global";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/clerk-react";

export const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onCreateResume = async () => {
    setLoading(true);
    const uuid = uuidv4();

    const data = {
      resumeId: uuid,
      title: resumeTitle,
      name: user?.fullName || null,
      email: user?.emailAddresses[0]?.emailAddress || null,
    };

    try {
      await createNewResume(data);
      console.log("Resume created successfully");
    } finally {
      setLoading(false);
      setOpenDialog(false);
      const data = await getResumeById(uuid);
      console.log("Fetched resume data:", data);
    }
  };

  return (
    <>
      <div
        className="p-14 py-24 border items-center flex justify-center rounded-lg bg-secondary h-[280px] hover:scale-101 transition-all hover:shadow-md cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <PlusCircleIcon />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Name your resume</DialogTitle>
            <DialogDescription>
              <Input
                className="mt-4"
                placeholder="Ex: React Engineer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant={"outline"} onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={onCreateResume}
                disabled={resumeTitle.length === 0 || loading}
              >
                Create {loading && <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
