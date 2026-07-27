import api from "./api";

export const joinSession = (data) => {
  return api.post("/join", data);
};