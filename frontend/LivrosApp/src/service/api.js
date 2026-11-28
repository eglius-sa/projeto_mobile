import axios from "axios";

const API_BASE_URL = "http://192.168.3.85:8081/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
//criar api nos endpoint da controller no backend