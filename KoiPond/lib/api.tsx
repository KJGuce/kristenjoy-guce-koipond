import axios from "axios";
import { Alm, Act } from "./types";

const API_URL = "http://10.0.0.175:8080"; // Adjust if necessary

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

// Fetch all acts (volunteer opportunities)
export const getAllActs = async (): Promise<Act[]> => {
  try {
    const response = await axios.get(`${API_URL}/opportunities`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all acts", error);
    throw error;
  }
};

// Fetch a single alm by ID
export const getAlmById = async (id: string): Promise<Alm> => {
  try {
    const response = await axios.get(`${API_URL}/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching alm with id ${id}`, error);
    throw error;
  }
};
