"use client";
import { createContext, useEffect, useState } from "react";
import { fetchSession } from "./utils/fetchSession";
export const ProviderContext = createContext(null);

export const Provider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      setLoading(true);
      fetchSession()
        .then((session) => setSession(session || {}))
        .catch((error) => setSession({}));
    } finally {
      setLoading(false);
    }
  }, [setSession]);
  return (
    <ProviderContext.Provider
      value={{
        session: {
          session,
          setSession,
          status:
            session === null
              ? "loading"
              : Object.keys(session).length
              ? "authenticated"
              : "unauthenticated",
        },
        loading: { loading, setLoading },
      }}>
      {children}
    </ProviderContext.Provider>
  );
};
