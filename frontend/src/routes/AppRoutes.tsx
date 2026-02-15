import {Routes, Route, Navigate} from "react-router-dom";
import ResultsPage from "../pages/admin/ResultsPage";
import ExamPage from "../pages/admin/ExamPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/results" />} />
      <Route path="/admin/results" element={<ResultsPage />} />
      <Route path="/admin/exams" element={<ExamPage />} />
    </Routes>
  );
}
