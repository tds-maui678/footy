import { createContext, useContext, useEffect, useState } from "react";

type Ctx = { theme: "light" | "dark"; toggle: () => void; set: (t:"light"|"dark")=>void };
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light"|"dark">(() =>
    (localStorage.getItem("theme") as "light"|"dark") || "light"
  );
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeCtx.Provider value={{ theme, toggle: () => setTheme(t => t==="dark"?"light":"dark"), set:setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}
export const useTheme = () => {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};