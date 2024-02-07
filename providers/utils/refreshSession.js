"use client";
import { api, instance, useSession } from "@/exports";

export async function refreshSession(setSession) {
  try {
    const response = await instance.get(api.getSession);
    setSession(response.data);
  } catch (err) {
    setSession({});
  }
}
