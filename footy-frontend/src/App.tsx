import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";
import { ThemeProvider } from "./lib/theme";
import LeagueDetail from "./pages/LeagueDetail";
import TeamDetail from "./pages/TeamDetail";

const qc = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={qc}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/league/:leagueName" element={<LeagueDetail />} />
              <Route path="/team/:teamName" element={<TeamDetail />} />
              <Route path="/players" element={<Players />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors closeButton />
      </ThemeProvider>
    </QueryClientProvider>
  );
}