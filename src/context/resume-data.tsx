import {
  createNewResumeService,
  getAllResumes,
  getResumeById,
  saveCurrentResume,
} from "@/service/global";
import { stripIds } from "@/utils/helpers";
import { useUser } from "@clerk/clerk-react";
import React, { createContext, useEffect, useReducer } from "react";
import { toast } from "sonner";

export interface ResumeData {
  id?: string;
  documentId?: string;
  personalInfo: {
    id: number;
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: number;
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate: string;
    description: string;
    workLocation: string;
  }>;
  education: Array<{
    id: number;
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

interface ResumeState {
  currentResume: ResumeData;
  savedResumes: ResumeData[];
  loading: boolean;
  error: string | null;
}

type ResumeAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CURRENT_RESUME"; payload: ResumeData }
  | { type: "SET_SAVED_RESUMES"; payload: ResumeData[] }
  | { type: "UPDATE_PERSONAL_INFO"; payload: { field: string; value: string } }
  | {
      type: "UPDATE_EXPERIENCE";
      payload: { id: number; field: string; value: string };
    }
  | { type: "ADD_EXPERIENCE" }
  | { type: "REMOVE_EXPERIENCE"; payload: number }
  | {
      type: "UPDATE_EDUCATION";
      payload: { id: number; field: string; value: string };
    }
  | { type: "ADD_EDUCATION" }
  | { type: "REMOVE_EDUCATION"; payload: number }
  | { type: "ADD_SKILL"; payload: { name: string; rating?: number } }
  | { type: "REMOVE_SKILL"; payload: number };

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    // id: 0,
  },
  experience: [],
  education: [],
  skills: [],
};

const initialState: ResumeState = {
  currentResume: initialResumeData,
  savedResumes: [],
  loading: false,
  error: null,
};

const resumeReducer = (state: ResumeState, action: ResumeAction) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CURRENT_RESUME":
      return { ...state, currentResume: action.payload };
    case "SET_SAVED_RESUMES":
      return { ...state, savedResumes: action.payload };
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          personalInfo: {
            ...state.currentResume.personalInfo,
            [action.payload.field]: action.payload.value,
          },
        },
      };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: state.currentResume.experience.map((exp) =>
            exp.id === action.payload.id
              ? {
                  ...exp,
                  [action.payload.field]: action.payload.value,
                }
              : exp
          ),
        },
      };
    case "ADD_EXPERIENCE": {
      const newExperience = {
        // id: Date.now(),
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
        workLocation: "",
      };
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: [...state.currentResume.experience, newExperience],
        },
      };
    }
    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          experience: state.currentResume.experience.filter(
            (exp) => exp.id !== action.payload
          ),
        },
      };
    case "ADD_EDUCATION": {
      const newEducation = {
        // id: Date.now(),
        degree: "",
        school: "",
        startDate: "",
        endDate: "",
      };
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: [...state.currentResume.education, newEducation],
        },
      };
    }
    case "UPDATE_EDUCATION":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: state.currentResume.education.map((edu) =>
            edu.id === action.payload.id
              ? {
                  ...edu,
                  [action.payload.field]: action.payload.value,
                }
              : edu
          ),
        },
      };
    case "REMOVE_EDUCATION":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          education: state.currentResume.education.filter(
            (edu) => edu.id !== action.payload
          ),
        },
      };
    case "ADD_SKILL":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          skills: [
            ...state.currentResume.skills,
            { name: action.payload.name, rating: action.payload.rating },
          ],
        },
      };
    case "REMOVE_SKILL":
      return {
        ...state,
        currentResume: {
          ...state.currentResume,
          skills: state.currentResume.skills.filter(
            (_, index) => index !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

interface ResumeContextType {
  state: ResumeState;
  actions: {
    updatePersonalInfo: (field: string, value: string) => void;
    addExperience: () => void;
    updateExperience: (id: number, field: string, value: string) => void;
    removeExperience: (id: number) => void;
    addEducation: () => void;
    updateEducation: (id: number, field: string, value: string) => void;
    removeEducation: (id: number) => void;
    addSkill: (skill: { name: string; rating?: number }) => void;
    removeSkill: (index: number) => void;
    createNewResumeInDB: () => Promise<void>;
    saveResume: () => Promise<void>;
    loadCurrentResume: (id: string) => Promise<void>;
    loadAllResumes: () => Promise<void>;
    // deleteResume: (id: number) => Promise<void>;
    createNewResume: () => void;
  };
}

export const ResumeContext = createContext<ResumeContextType | undefined>(
  undefined
);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  const { user } = useUser();

  useEffect(() => {
    loadAllResumes();
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    dispatch({
      type: "UPDATE_PERSONAL_INFO",
      payload: { field, value },
    });
  };

  const addExperience = () => {
    dispatch({ type: "ADD_EXPERIENCE" });
  };

  const updateExperience = (id: number, field: string, value: string) => {
    dispatch({ type: "UPDATE_EXPERIENCE", payload: { id, field, value } });
  };

  const removeExperience = (id: number) => {
    dispatch({ type: "REMOVE_EXPERIENCE", payload: id });
  };

  const addEducation = () => {
    dispatch({ type: "ADD_EDUCATION" });
  };

  const updateEducation = (id: number, field: string, value: string) => {
    dispatch({ type: "UPDATE_EDUCATION", payload: { id, field, value } });
  };

  const removeEducation = (id: number) => {
    dispatch({ type: "REMOVE_EDUCATION", payload: id });
  };

  const addSkill = (skill: { name: string; rating?: number }) => {
    dispatch({ type: "ADD_SKILL", payload: skill });
  };

  const removeSkill = (index: number) => {
    dispatch({ type: "REMOVE_SKILL", payload: index });
  };

  const createNewResumeInDB = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const payload = {
        personalInfo: state.currentResume.personalInfo,
        experience: state.currentResume.experience,
        education: state.currentResume.education,
        skills: state.currentResume.skills,
      };

      console.log("Saving resume:", payload);
      await createNewResumeService(payload);
      toast("Resume saved successfully!");
      await loadAllResumes();
    } catch (error) {
      console.error("Error saving resume:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to save resume." });
      toast(error.message || "Failed to save resume");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const saveResume = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const payload = {
        personalInfo: stripIds(state.currentResume.personalInfo),
        experience: stripIds(state.currentResume.experience),
        education: stripIds(state.currentResume.education),
        skills: stripIds(state.currentResume.skills),
      };

      console.log("Saving current resume:", payload);

      await saveCurrentResume(state.currentResume.documentId, payload);
      toast("Resume updated successfully!");
      await loadAllResumes();
    } catch (error: any) {
      console.error("Error updating resume:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to update resume." });
      toast(error.message || "Failed to update resume");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadAllResumes = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const resumes = await getAllResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      dispatch({ type: "SET_SAVED_RESUMES", payload: resumes.data || [] });
    } catch (error) {
      console.error("Error fetching resumes:", error);
      dispatch({ type: "SET_ERROR", payload: "Failed to load resumes." });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const loadCurrentResume = async (id: string) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const resume = await getResumeById(id);
      console.log("CONTEXT: resume data:", resume);
      dispatch({
        type: "SET_CURRENT_RESUME",
        payload: {
          id: resume.id,
          documentId: resume.documentId,
          personalInfo: resume.personalInfo,
          experience: resume.experience,
          education: resume.education,
          skills: resume.skills,
        },
      });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Failed to load resume" });
      toast(error.message || "Failed to load resume");
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const createNewResume = () => {
    dispatch({ type: "SET_CURRENT_RESUME", payload: initialResumeData });
  };

  const actions = {
    updatePersonalInfo,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    removeSkill,
    createNewResumeInDB,
    saveResume,
    loadAllResumes,
    loadCurrentResume,
    createNewResume,
  };

  return (
    <ResumeContext.Provider value={{ state, actions }}>
      {children}
    </ResumeContext.Provider>
  );
};
