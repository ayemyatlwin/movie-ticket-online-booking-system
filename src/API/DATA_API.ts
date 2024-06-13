import { JSON_URL } from "@/config/apiConfig";
import axios from "axios";

const DATA_API = axios.create({
  baseURL: JSON_URL,
});

export default DATA_API;
