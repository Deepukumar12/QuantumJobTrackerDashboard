import { createContext } from "react";

export type Theme = "light" | "dark";

export type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);
