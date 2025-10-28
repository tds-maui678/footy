import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CommandPalette from "../CommandPalette";

export default function DashboardLayout() {
  return (
    <div className="mx-auto w-full max-w-[1440px] px-6">
      <Navbar />
      <CommandPalette />
      <div className="container mx-auto px-4">
        <div className="flex gap-6 py-6">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}