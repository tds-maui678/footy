import { NavLink } from "react-router-dom";
import { LayoutGrid, Trophy, Users, Swords, Moon, Sun } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../../lib/theme";

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200"
          : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
      )
    }
  >
    <Icon className="h-4 w-4" />
    {label}
  </NavLink>
);

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-[1400px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Footy</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <NavItem to="/" icon={LayoutGrid} label="Leagues" />
            <NavItem to="/teams" icon={Trophy} label="Teams" />
            <NavItem to="/players" icon={Users} label="Players" />
            <NavItem to="/compare" icon={Swords} label="Compare" />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}