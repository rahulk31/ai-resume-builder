import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useResume } from "@/hooks/useResume";
import { Loader2, PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { actions } = useResume();
  const navigate = useNavigate();

  const onCreateResume = async () => {
    actions.createNewResume();
    navigate(`/dashboard/resume/${resumeTitle}/edit`);
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
