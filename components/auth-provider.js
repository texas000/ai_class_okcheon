"use client";

import { createContext, useContext } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { koKR } from "@clerk/localizations";

const AuthEnabledContext = createContext(false);

export function useAuthEnabled() {
  return useContext(AuthEnabledContext);
}

export default function AuthProvider({ enabled, children }) {
  return (
    <AuthEnabledContext.Provider value={enabled}>
      {enabled ? (
        <ClerkProvider
          localization={koKR}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/manage"
          signUpFallbackRedirectUrl="/manage"
          afterSignOutUrl="/"
          appearance={{ variables: { colorPrimary: "#c56742", borderRadius: "0.65rem" } }}
        >
          {children}
        </ClerkProvider>
      ) : children}
    </AuthEnabledContext.Provider>
  );
}
