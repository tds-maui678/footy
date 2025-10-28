import { Trophy, Users, Swords, Shield } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../ui/ThemeToggle";

const NavItem = ({ to, children }: { to:string; children:React.ReactNode }) => (
  <NavLink
    to={to}
    className={({isActive}) => cn(
      "px-3 py-2 rounded-lg text-sm transition",
      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/80 dark:bg-black/60 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Trophy className="h-5 w-5 text-blue-600" /> Footy Compare
        </Link>
        <nav className="flex items-center gap-2">
          <NavItem to="/">Leagues</NavItem>
          <NavItem to="/teams"><Shield className="h-4 w-4 mr-1" />Teams</NavItem>
          <NavItem to="/players"><Users className="h-4 w-4 mr-1" />Players</NavItem>
          <NavItem to="/compare"><Swords className="h-4 w-4 mr-1" />Compare</NavItem>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}