import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import CommandPalette from "../CommandPalette";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CommandPalette />
      <main className="flex-1 px-8 py-6 overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}