import api from "./api";

// =========================
// Get Faculty Sessions
// =========================
export const getFacultySessions = (facultyId) => {
  return api.get(`/sessions/${facultyId}`);
};

// =========================
// Create Session
// =========================
export const createSession = (data) => {
  return api.post("/sessions", data);
};

// =========================
// Get Session Details
// =========================
export const getSessionDetails = (sessionCode) => {
  return api.get(`/join/${sessionCode}`);
};

// =========================
// Update Session
// =========================
export const updateSession = (id, data) => {
  return api.put(`/sessions/${id}`, data);
};

// =========================
// Delete Session
// =========================
export const deleteSession = (id) => {
  return api.delete(`/sessions/${id}`);
};



export const getAllSessions = async () => {

    const response = await api.get(

        "/sessions/all"

    );

    return response.data;

};