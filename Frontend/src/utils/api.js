import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getCodeReview(code) {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.post(`${API_URL}/ai/get-review`, { code }, { headers });
  return response.data;
}

export async function getCredits() {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`${API_URL}/ai/credits`, { headers });
  return response.data;
}
