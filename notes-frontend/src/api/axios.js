import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://my-simple-notes-v1-2fcafdc02472.herokuapp.com"
    : "http://localhost:4500";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
