import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuestions } from "../../hooks/admin/useQuestions";
import { FaArrowLeft, FaTrash, FaEdit } from "react-icons/fa";

const ExamQuestionsPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const {
    questions,
    loading,
    error,
    fetchQuestionsByExam,
    deleteQuestion,
  } = useQuestions();

  useEffect(() => {
    if (examId) {
      fetchQuestionsByExam(Number(examId));
    }
  }, [examId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">
          Cargando preguntas...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            Preguntas del Examen {examId}
          </h1>
          <p className="text-gray-500 text-sm">
            CRUD de preguntas relacionadas a este examen
          </p>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Pregunta</th>
                <th className="px-6 py-3 text-left">Acciones</th>
                <th className="px-6 py-3 text-left">Opciones</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {questions.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">
                    No hay preguntas registradas
                  </td>
                </tr>
              )}

              {questions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{q.id}</td>
                  <td className="px-6 py-4">{q.pregunta}</td>

                  <td className="px-6 py-4 flex gap-2">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm">
                      <FaEdit />
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      onClick={async () => {
                        await deleteQuestion(q.id);
                        await fetchQuestionsByExam(Number(examId));
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                    <td
                      className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/admin/exams/questions/${q.id}/exam-options`)
                      }
                    >
                      {q.option_count}
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionsPage;
