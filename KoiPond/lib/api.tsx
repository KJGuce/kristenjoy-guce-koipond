// lib/api.tsx
import axios from "axios";
import { Alm, Act } from "./types";

const API_URL = "http://localhost:8080"; // Adjust if necessary

// Fetch latest alms (resources)
export const getLatestAlms = async (): Promise<Alm[]> => {
  try {
    const response = await axios.get(`${API_URL}/resources/latest`);
    return response.data;
  } catch (error) {
    console.error("Error fetching alms", error);
    throw error;
  }
};

// Fetch latest acts (volunteer opportunities)
export const getLatestActs = async (): Promise<Act[]> => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/latest`);
    return response.data;
  } catch (error) {
    console.error("Error fetching acts", error);
    throw error;
  }
};

// Fetch all resources
export const getAllResources = async (): Promise<Alm[]> => {
  try {
    const response = await axios.get(`${API_URL}/resources`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resources", error);
    throw error;
  }
};
