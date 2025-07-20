import { AddResume } from "@/components/custom/AddResume";
import { useNavigate } from "react-router";
import { useResume } from "@/hooks/useResume";

export const Dashboard = () => {
  const {
    state: { savedResumes },
  } = useResume();
  const navigate = useNavigate();

  console.log("Resume List:", savedResumes);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating your resume and polish with the help of AI.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5 gap-2">
        <AddResume />
        {savedResumes.length > 0 &&
          savedResumes.map((resume: any) => (
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
