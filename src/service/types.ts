export interface ResumeUser {
  id?: string;
  personalInfo: {
    id?: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id?: number;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
    workLocation: string;
  }>;
  education: Array<{
    id?: number;
    degree: string;
    school: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    id?: number;
    name: string;
    rating?: number;
  }>;
}
