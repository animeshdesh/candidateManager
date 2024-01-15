import axios from "axios";

const API_BASE_URL = "https://60d5a2c2943aa60017768b01.mockapi.io/candidate";

export const getAllCandidates = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error getting all candidates:", error);
    throw error;
  }
};

export const createCandidate = async (candidateData) => {
  try {
    const response = await axios.post(API_BASE_URL, candidateData);
    return response.data;
  } catch (error) {
    console.error("Error creating candidate:", error);
    throw error;
  }
};

export const updateCandidate = async (candidateId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${candidateId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating candidate:", error);
    throw error;
  }
};

export const deleteCandidate = async (candidateId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${candidateId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting candidate:", error);
    throw error;
  }
};
