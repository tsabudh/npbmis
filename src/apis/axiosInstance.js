import axios from "axios";

const API_URI =
  process.env.NODE_ENV === "production"
    ? "https://npbmis-server.vercel.app/api/v1"
    : "http://localhost:3000/api/v1";
//
const axiosInstance = axios.create({
  baseURL: API_URI,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
