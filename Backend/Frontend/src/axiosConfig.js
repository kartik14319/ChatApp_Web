// import axios from "axios";

// // Set your backend URL
// axios.defaults.baseURL = "https://chat-app-kartik143.onrender.com";
// axios.defaults.withCredentials = true; 

// export default axios;


import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL; // reads the correct one automatically

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
