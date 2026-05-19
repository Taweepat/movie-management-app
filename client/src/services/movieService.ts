import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const role = localStorage.getItem("userRole") || "FLOORSTAFF";
  config.headers["x-user-role"] = role;
  return config;
});

export const movieService = {
  getAll: async () => {
    const res = await api.get("/movies");
    return res.data;
  },

  getById: async (id: number) => {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },

  search: async (query: string) => {
    const res = await api.get(`/movies/search/${encodeURIComponent(query)}`);
    return res.data;
  },

  create: async (data: { title: string; year: number; rating: string }) => {
    const res = await api.post("/movies", data);
    return res.data;
  },

  update: async (id: number, data: { title: string; year: number; rating: string }) => {
    const res = await api.put(`/movies/${id}`, data);
    return res.data;
  },

  remove: async (id: number) => {
    const res = await api.delete(`/movies/${id}`);
    return res.data;
  },
};
