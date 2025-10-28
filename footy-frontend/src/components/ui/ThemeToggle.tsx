import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../lib/theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button aria-label="Toggle theme" onClick={toggle}
      className="ml-2 inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-2.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
      {theme === "dark" ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
    </button>
  );
}