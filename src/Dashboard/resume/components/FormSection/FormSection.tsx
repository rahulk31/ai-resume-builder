import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ResumeDataContext } from "@/context/resume-data";
import React from "react";
import { ModalAISummary } from "./ModalAISummary";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";

export const FormSection = () => {
  const { resumeData, setResumeData } = React.useContext(ResumeDataContext);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-foreground mb-2">Resume Builder</h1>
      <p className="text-sm text-muted-foreground mb-6">
        This is where you can edit your resume details.
      </p>

      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={resumeData.personalInfo?.name || ""}
                onChange={(e) => updatePersonalInfo("name", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo?.email || ""}
                placeholder="john@example.com"
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={resumeData.personalInfo?.phone || ""}
                placeholder="+1 (555) 123-4567"
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={resumeData.personalInfo?.location || ""}
                placeholder="Bengaluru, India"
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary" className="mb-1">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              value={resumeData.personalInfo?.summary || ""}
              placeholder="A brief summary of your professional background"
              className="h-24"
              onChange={(e) => updatePersonalInfo("summary", e.target.value)}
            />
            <ModalAISummary />
          </div>
        </CardContent>
      </Card>

      {/* Experience  */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Work Experience</CardTitle>
          <Button>
            <PlusCircle /> Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.experience?.map((exp, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="grid grid-cols-2 gap-3 flex-1">
                <div>
                  <Label htmlFor={`jobTitle-${index}`} className="mb-1">
                    Job Title
                  </Label>
                  <Input
                    id={`jobTitle-${index}`}
                    type="text"
                    value={exp.title || ""}
                    placeholder="eg. Software Engineer"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].title = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`companyName-${index}`} className="mb-1">
                    Company Name
                  </Label>
                  <Input
                    id={`companyName-${index}`}
                    type="text"
                    value={exp.companyName || ""}
                    placeholder="eg. Google"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].companyName = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor={`startDate-${index}`} className="mb-1">
                    Start Date
                  </Label>
                  <Input
                    id={`startDate-${index}`}
                    type="text"
                    value={exp.startDate || ""}
                    placeholder="eg. Jan 2021"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].startDate = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={`endDate-${index}`} className="mb-1">
                      End Date
                    </Label>
                    {/* <div className="flex items-center mb-1">
                      <Checkbox />
                      <Label
                        htmlFor={`currentlyWorking-${index}`}
                        className="ml-2"
                      >
                        Currently Working
                      </Label>
                    </div> */}
                  </div>
                  <Input
                    id={`endDate-${index}`}
                    type="text"
                    value={exp.endDate || ""}
                    placeholder="eg. Present or Jan 2022"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].endDate = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="workLocation" className="mb-1">
                    Work Location
                  </Label>
                  <Input
                    id="workLocation"
                    type="text"
                    value={exp.workLocation || ""}
                    placeholder="eg. New York/ Remote"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].workLocation = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor={`description-${index}`} className="mb-1">
                    Job Description
                  </Label>
                  <Textarea
                    id={`description-${index}`}
                    value={exp.description || ""}
                    placeholder="Describe your role and achievements"
                    onChange={(e) =>
                      setResumeData((prev) => {
                        const newExperience = [...prev.experience];
                        newExperience[index].description = e.target.value;
                        return { ...prev, experience: newExperience };
                      })
                    }
                  />
                </div>
              </div>
              <Button variant="secondary">
                Remove <Trash2 />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
