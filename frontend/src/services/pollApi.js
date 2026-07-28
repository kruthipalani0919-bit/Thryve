import api from "./api";

export const getSessionPolls = async (sessionId) => {
    const res = await api.get(`/polls/session/${sessionId}`);
    return res.data;
};

export const createPoll = async (data) => {
    const res = await api.post("/polls", data);
    return res.data;
};

export const getPollById = async (pollId) => {
    const res = await api.get(`/polls/${pollId}`);
    return res.data;
};

export const startPoll = async (pollId) => {
    const res = await api.put(`/polls/${pollId}/start`);
    return res.data;
};

export const submitPoll = async (pollId, option) => {
    const res = await api.post(`/polls/${pollId}/vote`, {
        option,
    });

    return res.data;
};


export const getPollResults = async (pollId) => {
    const res = await api.get(`/polls/${pollId}/results`);
    return res.data;
};