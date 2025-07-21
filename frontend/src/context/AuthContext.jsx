import React from "react";
import { createContext } from "react";
export const authDataContext = createContext();
function AuthContext({ children }) {
  let serverUrl = "https://nextcart-backend.onrender.com";

  let value = {
    serverUrl,
  };
  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
