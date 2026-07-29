import api from "./api";

// ======================================
// Generate AI Quiz
// ======================================

export const generateAIQuiz = async (formData) => {

    const response = await api.post(
        "/ai/generate",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

// ======================================
// Save AI Quiz
// ======================================

export const saveAIQuiz = async (quizData) => {

    const response = await api.post(
        "/ai/save",
        quizData
    );

    return response.data;
};

// ======================================
// AI Quiz Library
// ======================================

export const getAllAIQuizzes = async () => {

    const response = await api.get(
        "/ai/all"
    );

    return response.data;
};

// ======================================
// Assign AI Quiz
// ======================================

export const assignAIQuiz = async (data) => {

    const response = await api.post(
        "/ai/assign",
        data
    );

    return response.data;
};

// ======================================
// Assigned AI Quizzes for Session
// ======================================
export const getAssignedAIQuizzes = async (sessionId) => {

    const response = await api.get(

        `/ai/assigned/${sessionId}`

    );

    return response.data;

};

// ======================================
// Start AI Quiz
// ======================================

export const startAIQuiz = async (quizId) => {

    const response = await api.post(
        `/ai/start/${quizId}`
    );

    return response.data;
};