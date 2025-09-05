import axios from "axios";

// During development (Spring Boot running locally on port 8080)
const API = "http://localhost:8080/notess";

// CRUD methods
export const getNotes = () => axios.get(API);
export const createNote = (note) => axios.post(API, note);
export const updateNote = (id, note) => axios.put(`${API}/${id}`, note);
export const deleteNote = (id) => axios.delete(`${API}/${id}`);
export const shareNote = (id) => axios.get(`${API}/share/${id}`);
