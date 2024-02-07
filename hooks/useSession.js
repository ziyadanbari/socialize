import { ProviderContext } from "@/exports";
import { useContext } from "react";

export function useSession() {
  return useContext(ProviderContext).session;
}
