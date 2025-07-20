import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useResume } from "@/hooks/useResume";
import { Download } from "lucide-react";

export const ResumePreview = () => {
  const {
    state: { currentResume },
  } = useResume();
  console.log("PREVIEW: Resume Data:", currentResume);
  return (
    <div className="sticky top-6">
      <Card className="h-fit">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Preview</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              // disabled={loading}
            >
              <Download className="w-4 h-4 mr-1" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              // onClick={() => handleDownload("docx")}
              // disabled={loading}
            >
              <Download className="w-4 h-4 mr-1" />
              DOCX
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-2xl mx-auto bg-transparent border border-border rounded-lg">
            <div className={`p-8 rounded-lg shadow-card min-h-[600px]`}>
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {currentResume?.personalInfo?.name || "Your Name"}
                </h1>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                  {currentResume?.personalInfo?.email && (
                    <span>{currentResume?.personalInfo?.email}</span>
                  )}
                  {currentResume?.personalInfo?.phone && (
                    <span>{currentResume?.personalInfo?.phone}</span>
                  )}
                  {currentResume?.personalInfo?.location && (
                    <span>{currentResume?.personalInfo?.location}</span>
                  )}
                </div>
              </div>

              {/* Professional Summary */}
              {currentResume?.personalInfo?.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-2 border-b border-primary/20 pb-1">
                    Professional Summary
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {currentResume?.personalInfo?.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {currentResume?.experience?.some(
                (exp) => exp.jobTitle || exp.companyName
              ) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-primary/20 pb-1">
                    Work Experience
                  </h2>
                  <div className="space-y-4">
                    {currentResume?.experience
                      ?.filter((exp) => exp.jobTitle || exp.companyName)
                      .map((exp) => (
                        <div key={exp.id} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {exp.jobTitle || "Job Title"}
                              </h3>
                              <p className="text-sm text-primary font-medium">
                                {exp.companyName || "Company Name"},{" "}
                                <span className="text-muted-foreground">
                                  {exp.workLocation || "Location"}
                                </span>
                              </p>
                            </div>
                            {(exp.startDate || exp.endDate) && (
                              <div className="text-sm text-muted-foreground">
                                <p>
                                  {exp.startDate} - {exp.endDate || "Present"}
                                </p>
                              </div>
                            )}
                          </div>
                          {exp.description && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {exp.description}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {currentResume?.education?.some(
                (edu) => edu.degree || edu.school
              ) && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-primary/20 pb-1">
                    Education
                  </h2>
                  <div className="space-y-3">
                    {currentResume?.education
                      ?.filter((edu) => edu.degree || edu.school)
                      .map((edu) => (
                        <div
                          key={edu.id}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {edu.degree || "Degree"}
                            </h3>
                            <p className="text-sm text-primary">
                              {edu.school || "School Name"}
                            </p>
                          </div>
                          {(edu.startDate || edu.endDate) && (
                            <div className="text-sm text-muted-foreground">
                              {edu.startDate} - {edu.endDate || "Present"}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {currentResume?.skills?.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-primary/20 pb-1">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {currentResume?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State */}
              {!currentResume?.personalInfo?.name &&
                !currentResume?.personalInfo?.summary &&
                !currentResume?.experience?.some(
                  (exp) => exp.jobTitle || exp.companyName
                ) &&
                !currentResume?.education?.some(
                  (edu) => edu.degree || edu.school
                ) &&
                currentResume?.skills?.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-muted-foreground">
                      <p className="text-lg mb-2">
                        Your resume preview will appear here
                      </p>
                      <p className="text-sm">
                        Start filling out the form to see your resume come to
                        life
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
