import axios from "axios";

export async function submitForm(url, formData) {
  const config = {
    headers: {},
  };

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await axios.post(url, formData, config);

    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error?.response?.data?.message || "An error occurred" };
  }
}