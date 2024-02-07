import { ProviderContext } from "@/exports";
import { useContext } from "react";

export function useLoading() {
  return useContext(ProviderContext)?.loading;
}
