import { callApi, message } from "./apiServices";

export const registerPatientService = async (patientData) => {
  try {
    const response = await callApi({
      endpoint: "api/v1/patients/register",
      method: "POST",
      body: patientData,
    });
    message.success("Patient registered successfully!");
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Failed to register patient");
    throw error;
  }
};

export const getPatientsService = async () => {
  try {
    const response = await callApi({
      endpoint: "api/v1/patients",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    message.error(error.response?.data?.message || "Failed to fetch patients");
    throw error;
  }
};
