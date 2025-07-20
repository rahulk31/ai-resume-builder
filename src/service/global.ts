import axios from "axios";
import type { ResumeUser } from "./types";

const API_KEY = import.meta.env.VITE_STRAPI_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResumeService = async (data: ResumeUser) => {
  console.log("Creating resume with data:", data);
  try {
    const response = await axiosClient.post("/resume-users", {
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating resume:", error);
    throw error;
  }
};
const saveCurrentResume = async (
  documentId: string | undefined,
  data: ResumeUser
) => {
  try {
    const response = await axiosClient.put(`/resume-users/${documentId}`, {
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating resume:", error);
    throw error;
  }
};

const getAllResumes = async (email: string | undefined) => {
  console.log("Fetching all resumes for email:", email);
  try {
    const response = await axiosClient.get("/resume-users", {
      params: { filters: { email } },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching resumes:", error);
    throw error;
  }
};

const getResumeById = async (resumeId: string | undefined) => {
  console.log("Fetching resume with ID:", resumeId);
  try {
    const response = await axiosClient.get(
      `/resume-users/${resumeId}?populate=*`
    );
    console.log("SERVICE: resume data:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

export {
  createNewResumeService,
  getAllResumes,
  getResumeById,
  saveCurrentResume,
};
