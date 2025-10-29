import axios from "axios";

export async function getCodeReview(code) {
  const response = await axios.post("http://localhost:3000/ai/get-review", { code });
  return response.data;
}

export async function getCredits() {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get("http://localhost:3000/ai/credits", { headers });
  return response.data;
}
