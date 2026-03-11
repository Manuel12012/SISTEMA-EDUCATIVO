import {Routes, Route, Navigate} from "react-router-dom";
import ResultsPage from "../pages/admin/ResultsPage";
import ExamPage from "../pages/admin/ExamPage";
import MainLayout from "../layouts/MainLayout";
import CoursePage from "../pages/admin/CoursePage";
import UsersPage from "../pages/admin/UsersPage";
import ExamQuestionPage from "../pages/admin/ExamQuestionPage";
import ModulePage from "../pages/ModulePage";
import LessonPage from "../pages/admin/LessonPage";
import TakeExamPage from "../pages/admin/TakeExamPage";
import {LoginPage} from "../pages/auth/LoginPage";
import {AuthProvider} from "../context/AuthProvider";
import {ProtectedRoute} from "./ProtectedRoute";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<MainLayout />}>
          <Route path="/admin/results" element={<ResultsPage />} />
          <Route path="/admin/exams" element={<ExamPage />} />
          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/exams/:id/take" element={<TakeExamPage />} />
          <Route
            path="/admin/exams/:examId/questions"
            element={<ExamQuestionPage />}
          />
          <Route
            path="/admin/courses/:courseId/modules"
            element={<ModulePage />}
          />
          <Route
            path="/admin/courses/:courseId/modules/:moduleId/lessons/:lessonId"
            element={<LessonPage />}
          />
        </Route>
      </Routes>
  );
}
