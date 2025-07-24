import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ModalAISummary } from "./ModalAISummary";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useResume } from "@/hooks/useResume";
import { useState } from "react";

export const FormSection = () => {
  const { state, actions } = useResume();
  const { currentResume } = state;
  const [currentSkill, setCurrentSkill] = useState("");

  const addSkill = () => {
    if (currentSkill.trim() === "") return;
    actions.addSkill({ name: currentSkill, rating: 0 });
    setCurrentSkill("");
  };

  return (
    <div className="space-y-6">
      {/* Personal Details */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={currentResume.personalInfo?.name || ""}
                onChange={(e) =>
                  actions.updatePersonalInfo("name", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={currentResume.personalInfo?.email || ""}
                placeholder="john@example.com"
                onChange={(e) =>
                  actions.updatePersonalInfo("email", e.target.value)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={currentResume.personalInfo?.phone || ""}
                placeholder="+1 (555) 123-4567"
                onChange={(e) =>
                  actions.updatePersonalInfo("phone", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={currentResume.personalInfo?.location || ""}
                placeholder="Bengaluru, India"
                onChange={(e) =>
                  actions.updatePersonalInfo("location", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary" className="mb-1">
              Professional Summary
            </Label>
            <Textarea
              id="summary"
              value={currentResume.personalInfo?.summary || ""}
              placeholder="A brief summary of your professional background"
              className="h-24"
              onChange={(e) =>
                actions.updatePersonalInfo("summary", e.target.value)
              }
            />
            <ModalAISummary />
          </div>
        </CardContent>
      </Card>

      {/* Experience  */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={actions.addExperience}>
            <Plus /> Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentResume.experience?.map((exp, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor={`jobTitle-${index}`} className="mb-1">
                    Job Title
                  </Label>
                  <Input
                    id={`jobTitle-${index}`}
                    type="text"
                    value={exp.jobTitle || ""}
                    placeholder="eg. Software Engineer"
                    onChange={(e) =>
                      actions.updateExperience(
                        exp.id,
                        "jobTitle",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Label htmlFor={`companyName-${index}`} className="mb-1">
                    Company Name
                  </Label>
                  <Input
                    id={`companyName-${index}`}
                    type="text"
                    value={exp.companyName || ""}
                    placeholder="eg. Google"
                    onChange={(e) =>
                      actions.updateExperience(
                        exp.id,
                        "companyName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="col-span-1">
                  <Label htmlFor={`startDate-${index}`} className="mb-1">
                    Start Date
                  </Label>
                  <Input
                    id={`startDate-${index}`}
                    type="text"
                    value={exp.startDate || ""}
                    placeholder="eg. Jan 2021"
                    onChange={(e) =>
                      actions.updateExperience(
                        exp.id,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="col-span-1">
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={`endDate-${index}`} className="mb-1">
                      End Date
                    </Label>
                  </div>
                  <Input
                    id={`endDate-${index}`}
                    type="text"
                    value={exp.endDate || ""}
                    placeholder="eg. Present or Jan 2022"
                    onChange={(e) =>
                      actions.updateExperience(
                        exp.id,
                        "endDate",
                        e.target.value
                      )
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
                      actions.updateExperience(
                        exp.id,
                        "workLocation",
                        e.target.value
                      )
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
                      actions.updateExperience(
                        exp.id,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => actions.removeExperience(exp.id)}
              >
                Remove <Trash2 />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education  */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Education</CardTitle>
          <Button onClick={actions.addEducation}>
            <Plus /> Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentResume.education?.map((edu, index) => (
            <div
              key={index}
              className="border border-border rounded-lg p-4 space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                <div>
                  <Label htmlFor={`degree-${index}`} className="mb-1">
                    Degree
                  </Label>
                  <Input
                    id={`degree-${index}`}
                    type="text"
                    value={edu.degree || ""}
                    placeholder="eg. B.Tech (CSE)"
                    onChange={(e) =>
                      actions.updateEducation(edu.id, "degree", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`school-${index}`} className="mb-1">
                    School/ University
                  </Label>
                  <Input
                    id={`school-${index}`}
                    type="text"
                    value={edu.school || ""}
                    placeholder="eg. IIT Delhi"
                    onChange={(e) =>
                      actions.updateEducation(edu.id, "school", e.target.value)
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
                    value={edu.startDate || ""}
                    placeholder="eg. Jan 2021"
                    onChange={(e) =>
                      actions.updateEducation(
                        edu.id,
                        "startDate",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Label htmlFor={`endDate-${index}`} className="mb-1">
                      End Date
                    </Label>
                  </div>
                  <Input
                    id={`endDate-${index}`}
                    type="text"
                    value={edu.endDate || ""}
                    placeholder="eg. Present or Jan 2022"
                    onChange={(e) =>
                      actions.updateEducation(edu.id, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>
              <Button
                variant="secondary"
                onClick={() => actions.removeEducation(edu.id)}
              >
                Remove <Trash2 />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a skill..."
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button onClick={addSkill} disabled={!currentSkill.trim()}>
              <Plus /> Add Skill
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentResume.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill.name}
                <button
                  onClick={() => actions.removeSkill(index)}
                  className="hover:text-destructive cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
