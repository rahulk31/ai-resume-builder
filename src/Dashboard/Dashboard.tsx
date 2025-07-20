import { AddResume } from "@/components/custom/AddResume";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getAllResumes } from "../../service/global";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await getAllResumes(
          user?.primaryEmailAddress?.emailAddress
        );
        setResumeList(data.data || []);
      } catch (error) {
        console.error("Error fetching resumes:", error);
      }
    };

    if (user) {
      fetchResumes();
    }
  }, [user]);

  console.log("Resume List:", resumeList);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating your resume and polish with the help of AI.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 gap-2">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume: any) => (
            <div
              key={resume.id}
              className="p-14 py-24 border items-center flex justify-center rounded-lg bg-secondary h-[280px] hover:scale-101 transition-all hover:shadow-md cursor-pointer"
              onClick={() =>
                navigate(`/dashboard/resume/${resume.documentId}/edit`)
              }
            >
              <h3 className="font-semibold text-lg">{resume.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};
