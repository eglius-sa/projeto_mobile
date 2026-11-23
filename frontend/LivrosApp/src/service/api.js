import axios from "axios";

const API_BASE_URL = "http://191.52.101.27:8080/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
