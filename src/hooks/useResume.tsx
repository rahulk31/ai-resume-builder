import { ResumeContext } from "@/context/resume-data";
import { useContext } from "react";

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
