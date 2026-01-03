import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // IMPORTANT for auth cookies
});

export const addQuiz = async ({ questions, document, courseId }) => {
  const formData = new FormData();

  formData.append("courseId", courseId);
  formData.append("questions", JSON.stringify(questions));

  if (document) {
    formData.append("document", document);
  }

  const response = await API.post("/quiz/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
