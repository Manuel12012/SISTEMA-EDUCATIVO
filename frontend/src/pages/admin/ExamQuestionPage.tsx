import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuestions} from "../../hooks/admin/useQuestions";
import {FaArrowLeft, FaTrash, FaEdit, FaRedo, FaSearch} from "react-icons/fa";
import type {Question} from "../../types/question";
import {MdCreateNewFolder} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

const ExamQuestionsPage = () => {
  const {examId} = useParams();
  const navigate = useNavigate();

  const {
    questions,
    loading,
    error,
    fetchQuestions,
    fetchQuestionById,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    fetchQuestionsByExam,
  } = useQuestions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editResultId, setEditingResultId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState<number | "">("");

  const [formData, setFormData] = useState({
    pregunta: "",
    correct_option_id: "",
  });

  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);

  const handleEditingClick = (question: Question) => {
    setEditingResultId(question.id);
    setFormData({
      pregunta: question.pregunta,
      correct_option_id: question.correct_option_id,
    });
    setIsModalOpen(true);
  };

  // traemos las preguntas por id de examen
  useEffect(() => {
    if (examId) {
      fetchQuestionsByExam(Number(examId));
    }
  }, [examId]);

  // use effect para buscar por id
  useEffect(() => {
    setDisplayedQuestions(questions);
  }, [questions]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Cargando preguntas...</p>
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
          <h1 className="text-3xl font-bold">Preguntas del Examen {examId}</h1>
          <p className="text-gray-500 text-sm">
            CRUD de preguntas relacionadas a este examen
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="rounded bg-green-400 px-4 py-2 text-white hover:bg-green-500"
          onClick={() => {
            setEditingResultId(null);
            setFormData({
              pregunta: "",
              correct_option_id: "",
            });
            setIsModalOpen(true);
          }}
        >
          <MdCreateNewFolder size={18} />
        </button>

        <div className="flex gap-2 items center">
          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border px-2 py-2 rounded w-32"
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              if (searchId !== "") {
                const result = questions.find((q) => q.id === searchId);
                setDisplayedQuestions(result ? [result] : []);
              } else {
                setDisplayedQuestions(questions);
              }
            }}
          >
            <FaSearch />
          </button>

          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            onClick={() => {
              setSearchId("");
              fetchQuestions();
            }}
          >
            <FaRedo />
          </button>
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
                <th className="px-6 py-3 text-left">Opciones</th>
                <th className="px-6 py-3 text-left">Opcion correcta</th>
                                <th className="px-6 py-3 text-left">Acciones</th>

              </tr>
            </thead>

            <tbody className="divide-y">
              {displayedQuestions.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400">
                    No hay preguntas registradas
                  </td>
                </tr>
              )}

              {displayedQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">{q.id}</td>
                  <td className="px-6 py-4">{q.pregunta}</td>


                  <td
                    className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                      navigate(`/admin/exams/questions/${q.id}/exam-options`)
                    }
                  >
                    {q.option_count}
                  </td>
                  <td className="px-6 py-4">{q.correct_option_id}</td>
                                    <td className="px-6 py-4 flex gap-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEditingClick(q)}
                    >
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
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                <h2 className="text-xl font-bold mb-4">
                  {editResultId !== null ? "Editar Pregunta" : "Crear Pregunta"}
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pregunta
                    </label>

                    <input
                      type="text"
                      value={formData.pregunta}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pregunta: String(e.target.value),
                        })
                      }
                      className="border px-3 py-2 rounded w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Respuesta correcta
                    </label>

                    <input
                      type="text"
                      value={formData.correct_option_id}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          correct_option_id: String(e.target.value),
                        })
                      }
                      className="border px-3 py-2 rounded w-full"
                    />
                  </div>

                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancelar
                    </button>

                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      onClick={async () => {
                        try {
                          if (editResultId !== null) {
                            // actualizar pregunta existente
                            await updateQuestion(editResultId, {
                              exam_id: Number(examId), // obligatoriamente enviamos exam_id
                              pregunta: formData.pregunta,
                              correct_option_id: formData.correct_option_id,
                            });
                            toast.success("Pregunta actualizada correctamente");
                          } else {
                            // crear nueva pregunta
                            await createQuestion({
                              exam_id: Number(examId), // <-- aquí usamos el ID del examen
                              pregunta: formData.pregunta,
                              correct_option_id:
                                formData.correct_option_id || "", // si agregas campo respuesta_correcta
                            });
                            toast.success("Pregunta creada correctamente");
                          }

                          // cerrar modal y refrescar lista
                          setIsModalOpen(false);
                          fetchQuestionsByExam(Number(examId));
                        } catch (error) {
                          console.error(error);
                          toast.error("Error al crear la pregunta");
                        }
                      }}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamQuestionsPage;
