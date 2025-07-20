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

const createNewResume = async (data: ResumeUser) => {
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
    const response = await axiosClient.get(`/resume-users/${resumeId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resume:", error);
    throw error;
  }
};

export { createNewResume, getAllResumes, getResumeById };
