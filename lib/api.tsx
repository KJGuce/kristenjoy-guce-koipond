import axios from "axios";
import { Alm, Act, NewAlm } from "./types";

export const API_URL = "http://localhost:8080"; // Adjust if necessary

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

// Fetch all resources with optional query parameters
export const getAllResources = async (
  queryParams: string = ""
): Promise<Alm[]> => {
  try {
    const response = await axios.get(`${API_URL}/resources${queryParams}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching resources", error);
    throw error;
  }
};

// Fetch all acts (volunteer opportunities)
export const getAllOpportunities = async (): Promise<Act[]> => {
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

// Fetch a single act by ID
export const getActById = async (id: string): Promise<Act> => {
  try {
    const response = await axios.get(`${API_URL}/opportunities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching act with id ${id}`, error);
    throw error;
  }
};

// Utility function to convert a URI to a Blob
const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};

// Post a new alm (resource)
export const postNewAlm = async (almData: {
  name: string;
  description: string;
  category: string;
  quantity: number;
  location: string;
  condition: string;
  image: string | null; // This is the image URI
}) => {
  const formData = new FormData();

  formData.append("name", almData.name);
  formData.append("description", almData.description);
  formData.append("category", almData.category);
  formData.append("quantity", almData.quantity.toString());
  formData.append("location", almData.location);
  formData.append("condition", almData.condition);

  if (almData.image) {
    const imageName = `image_${Date.now()}.jpg`;
    const imageType = "image/jpeg"; // Adjust based on your image format

    formData.append("image", {
      uri: almData.image,
      name: imageName,
      type: imageType,
    } as any); // `as any` is needed due to TypeScript limitations
  }

  try {
    const response = await fetch(`${API_URL}/resources`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data", // Ensure multipart
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Error posting Alm:", error);
    throw error;
  }
};

// Post a new act (volunteer opportunity)
export const postNewAct = async (actData: {
  title: string;
  start_date: string; // ISO 8601 formatted string
  end_date: string; // ISO 8601 formatted string
  location: string;
  category: string;
  description: string;
  police_check_required: number;
}): Promise<Act> => {
  try {
    const response = await axios.post(`${API_URL}/opportunities`, actData);
    return response.data;
  } catch (error) {
    console.error("Error posting Act:", error);
    throw error;
  }
};

// Delete an alm by ID
export const deleteAlmById = async (
  id: string
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.delete(`${API_URL}/resources/${id}`);
    return { success: response.status === 200 };
  } catch (error) {
    console.error(`Error deleting alm with id ${id}`, error);
    throw error;
  }
};

// Delete an act by ID
export const deleteActById = async (
  id: string
): Promise<{ success: boolean }> => {
  try {
    const response = await axios.delete(`${API_URL}/opportunities/${id}`);
    return { success: response.status === 200 };
  } catch (error) {
    console.error(`Error deleting act with id ${id}`, error);
    throw error;
  }
};
