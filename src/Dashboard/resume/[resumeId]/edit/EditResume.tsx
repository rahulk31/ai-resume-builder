import { useEffect, useState } from "react";
import { useParams } from "react-router";
// import { getResumeById } from "../../../../../service/global";
import { ResumePreview } from "../../components/ResumePreview";
import { FormSection } from "../../components/FormSection";
import { ResumeDataContext } from "@/context/resume-data";
import mockResumeData from "@/data/mock";

export const EditResume = () => {
  const params = useParams();
  const [resumeData, setResumeData] = useState({});
  useEffect(() => {
    setResumeData(mockResumeData);
    console.log(mockResumeData);
    // Fetch the resume data using the ID from params
    // const fetchResumeDataById = async () => {
    //   try {
    //     const data = await getResumeById(params.resumeId);
    //     console.log("Fetched resume data:", data);
    //   } catch (error) {
    //     console.error("Error fetching resume data:", error);
    //   }
    // };
    // fetchResumeDataById();
  }, [params]);

  return (
    <ResumeDataContext.Provider value={{ resumeData, setResumeData }}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <FormSection />
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeDataContext.Provider>
  );
};
