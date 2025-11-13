import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { "Content-Type": "application/json" }
});

export const BuggysAPI = {
  list: () => client.get("/buggys").then(r => r.data),
  create: (title) => client.post("/buggys", { title }).then(r => r.data),
  update: (id, patch) => client.put(`/buggys/${id}`, patch).then(r => r.data),
  remove: (id) => client.delete(`/buggys/${id}`).then(r => r.data)
};
