// src/pages/LeagueDetail.tsx
import { useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
export default function LeagueDetail() {
  const { leagueName = "" } = useParams();
  return (
    <>
      <PageHeader title={leagueName} subtitle="(Standings & knockout tree coming next)" />
      <div className="text-gray-500">We’ll render standings with your /api endpoints here.</div>
    </>
  );
}