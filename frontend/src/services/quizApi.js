import api from "./api";

export const startQuiz = async (quizId) => {
  const res = await api.put(`/quizzes/${quizId}/start`);
  return res.data;
};

export const submitQuiz = async (answers) => {
    const res = await api.post("/questions/submit", {
        answers
    });

    return res.data;
};