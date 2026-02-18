import {Routes, Route, Navigate} from "react-router-dom";
import ResultsPage from "../pages/admin/ResultsPage";
import ExamPage from "../pages/admin/ExamPage";
import MainLayout from "../layouts/MainLayout";
import CoursePage from "../pages/admin/CoursePage";
import UsersPage from "../pages/admin/UsersPage";
import ExamQuestionPage from "../pages/admin/ExamQuestionPage";
import ExamOptionsPage from "../pages/admin/ExamOptionsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/admin/results" element={<ResultsPage />} />
        <Route path="/admin/exams" element={<ExamPage />} />
        <Route path="/admin/courses" element={<CoursePage />} />
        <Route path="/admin/users" element={<UsersPage />} />
        <Route
          path="/admin/exams/:examId/questions"
          element={<ExamQuestionPage />}
        />
                <Route
          path="/admin/exams/questions/:questionId/exam-options"
          element={<ExamOptionsPage />}
        />
      </Route>
    </Routes>
  );
}
