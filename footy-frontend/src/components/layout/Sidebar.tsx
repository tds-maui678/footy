// Should Colapse on small screens --
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { LayoutGrid, Trophy, Users, Swords } from "lucide-react";

const Item = ({ to, icon:Icon, label }:{to:string; icon:any; label:string}) => (
  <NavLink to={to}
    className={({isActive})=>cn(
      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm",
      isActive ? "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200"
               : "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    <Icon className="h-4 w-4" /> {label}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-[240px] shrink-0 border-r border-gray-200 dark:border-gray-800 p-4">
      <div className="grid gap-2">
        <Item to="/" icon={LayoutGrid} label="Leagues" />
        <Item to="/teams" icon={Trophy} label="Teams" />
        <Item to="/players" icon={Users} label="Players" />
        <Item to="/compare" icon={Swords} label="Compare" />
      </div>
    </aside>
  );
}