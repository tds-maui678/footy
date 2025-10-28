
import { useParams } from "react-router-dom";
import PageHeader from "../components/layout/PageHeader";
export default function TeamDetail() {
  const { teamName = "" } = useParams();
  return (
    <>
      <PageHeader title={teamName} subtitle="Players & team stats will show here." />
      <div className="text-gray-500">We’ll use /api/players & /api/teams/statistics for this view.</div>
    </>
  );
}