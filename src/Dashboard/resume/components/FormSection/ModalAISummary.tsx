import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CloudLightning, LightbulbIcon, Loader2Icon, Zap } from "lucide-react";
import { generateSummaryAI } from "../../../../service/gemini";
import { toast } from "sonner";
import { useResume } from "@/hooks/useResume";

export const ModalAISummary = () => {
  const [aiPayloadData, setAiPayloadData] = useState({
    role: "",
    skills: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [outputSummary, setOutputSummary] = useState<string>("");
  const { actions } = useResume();

  interface AiPayload {
    role: string;
    experience: string;
    skills: string;
  }

  const generateSummary = async ({ role, experience, skills }: AiPayload) => {
    setLoading(true);
    try {
      const response = await generateSummaryAI({ role, experience, skills });
      setOutputSummary(response);
      console.log("AI Summary Response:", response);
      toast("AI Summary generated successfully!");
    } catch (error) {
      console.error("Error generating AI summary:", error);
      toast(error.message || "Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="secondary" className="mt-2" size="sm">
          <Zap /> AI Enhance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {!outputSummary
              ? "Write profile summary using our AI assistant."
              : "AI Generated Profile Summary"}
          </DialogTitle>
          {!outputSummary && (
            <DialogDescription>
              Share few details to cater specific role, experience, skills, etc.
              as per your requirement.
            </DialogDescription>
          )}
        </DialogHeader>
        <Card>
          <CardContent className="space-y-4">
            {!outputSummary ? (
              <>
                <div>
                  <Label htmlFor="role" className="mb-1">
                    Job Role
                  </Label>
                  <Input
                    id="role"
                    placeholder="e.g. Software Engineer"
                    onChange={(e) =>
                      setAiPayloadData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="skills" className="mb-1">
                    Key Skills
                  </Label>
                  <Input
                    id="skills"
                    placeholder="e.g. React, Node.js"
                    onChange={(e) =>
                      setAiPayloadData((prev) => ({
                        ...prev,
                        skills: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="experience" className="mb-1">
                    Experience Level
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setAiPayloadData((prev) => ({
                        ...prev,
                        experience: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button
                    onClick={() => generateSummary(aiPayloadData)}
                    disabled={
                      !aiPayloadData.role ||
                      !aiPayloadData.skills ||
                      !aiPayloadData.experience
                    }
                  >
                    {loading ? (
                      <>
                        Thinking{" "}
                        <Loader2Icon className="animate animate-spin" />
                      </>
                    ) : (
                      <>
                        Write Summary <CloudLightning />
                      </>
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">{outputSummary}</p>
            )}
          </CardContent>
        </Card>
        {outputSummary && (
          <div className="mt-1">
            <DialogClose asChild>
              <Button
                onClick={() =>
                  actions.updatePersonalInfo("summary", outputSummary)
                }
              >
                Use and Edit <LightbulbIcon />
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              className="ml-2"
              onClick={() => {
                setOutputSummary("");
                setAiPayloadData({
                  role: "",
                  skills: "",
                  experience: "",
                });
              }}
            >
              Regenerate <Zap />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
