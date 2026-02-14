import { useEffect } from "react";
import { useExams } from "../../src/hooks/admin/useExams";

const ExamManagementPage = () => {
  const { exams, loading, error, fetchExams } = useExams();

  useEffect(() => {
    fetchExams();
  }, []);

  if (loading) return <p>Cargando exámenes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    exams
  );
}

export default ExamManagementPage;
