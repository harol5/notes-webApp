import axios from "axios";
// const BASE_URL = "http://localhost:4500";
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4500"
    : "https://my-simple-notes-v1-2fcafdc02472.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
