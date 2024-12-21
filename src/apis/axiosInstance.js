import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Replace with your actual base URL
  timeout: 10000, // Optional: Set a timeout
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export default axiosInstance;
