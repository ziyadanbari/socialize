import { api, instance } from "@/exports";

export async function fetchSession() {
    const response = await instance.get(api.getSession)
    return response.data
}