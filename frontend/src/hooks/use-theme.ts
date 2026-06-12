import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProviderContext } from "@/contexts/theme-context";

export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProviderContext };
