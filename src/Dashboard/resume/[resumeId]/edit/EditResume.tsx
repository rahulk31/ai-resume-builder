import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { ResumePreview } from "../../components/ResumePreview";
import { FormSection } from "../../components/FormSection";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { useResume } from "@/hooks/useResume";

export const EditResume = () => {
  const params = useParams();
  const {
    state: { currentResume, loading },
    actions,
  } = useResume();
  const hasFetchedResume = useRef(false);

  useEffect(() => {
    if (!hasFetchedResume.current && params.resumeId) {
      actions.loadCurrentResume(params.resumeId);
      hasFetchedResume.current = true;
    }
  }, [actions, params.resumeId]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Resume Builder
            </h1>
            <p className="text-muted-foreground">
              Create your professional resume with AI assistance
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={actions.createNewResume} variant="outline">
              New Resume
            </Button>
            <Button
              disabled={loading}
              onClick={
                currentResume.id
                  ? actions.saveResume
                  : actions.createNewResumeInDB
              }
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save
            </Button>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <FormSection />
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};
