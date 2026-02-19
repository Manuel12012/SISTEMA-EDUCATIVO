import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuestions} from "../../hooks/admin/useQuestions";
import {FaArrowLeft, FaTrash, FaEdit, FaRedo, FaSearch} from "react-icons/fa";
import type {Question} from "../../types/question";
import {MdCreateNewFolder} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useExams} from "../../hooks/admin/useExams";

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

  const {exams, fetchExams, fetchExamById} = useExams();
  const [examTitle, setExamTitle] = useState<string>("");

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

  useEffect(() => {
    if (!examId) return;

    // 1️⃣ Fetch examen por id
    fetchExamById(Number(examId)).then((exam) => {
      if (exam) setExamTitle(exam.titulo);
    });

    // 2️⃣ Fetch preguntas del examen
    fetchQuestionsByExam(Number(examId));
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
      <div className="flex items-center justify-between">
        {/* IZQUIERDA: botón + título */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 px-2 py-2 rounded"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Preguntas del Examen: {examTitle || `#${examId}`}
            </h1>
            <p className="text-gray-500 text-sm">
              CRUD de preguntas relacionadas a este examen
            </p>
          </div>
        </div>

        {/* DERECHA: botón guardar */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          Guardar cambios
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {displayedQuestions.map((q) => (
          <div key={q.id} className="flex justify-between gap-4 w-full">
            {/* IZQUIERDA */}
            <div className="flex flex-col rounded-lg w-1/2 bg-gray-600 px-8 py-5">
              <p className="rounded text-xl text-white mb-5">Pregunta {q.id}</p>
              <textarea
                className="border rounded bg-gray-200 w-full"
                value={q.pregunta}
                onChange={(e) =>
                  setDisplayedQuestions((prev) =>
                    prev.map((item) =>
                      item.id === q.id
                        ? {...item, pregunta: e.target.value}
                        : item,
                    ),
                  )
                }
              />
            </div>

            {/* DERECHA */}
            <div className="w-1/2 bg-gray-200 p-4 rounded">
              <p>Contenido adicional</p>
              {/* aquí puedes poner botones, select, info, etc */}
            </div>
          </div>
        ))}
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
