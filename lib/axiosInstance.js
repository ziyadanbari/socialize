import { api } from "@/exports";
import axios from "axios";

export const instance = axios.create({
  baseURL: api.baseURL,
});
