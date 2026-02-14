import { Routes, Route, Navigate } from "react-router-dom";
import ResultsPage from "../pages/admin/ResultsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/results" />} />
      <Route path="/admin/results" element={<ResultsPage />} />
    </Routes>
  );
}
