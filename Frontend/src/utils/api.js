import axios from "axios";

export async function getCodeReview(code) {
  const response = await axios.post("http://localhost:3000/ai/get-review", { code });
  return response.data;
}
