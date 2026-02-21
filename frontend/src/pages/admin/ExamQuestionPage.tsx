// Importaciones
import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useQuestions} from "../../hooks/admin/useQuestions";
import {FaArrowLeft, FaTrash, FaRedo, FaSearch} from "react-icons/fa";
import type {Question} from "../../types/question";
import {MdCreateNewFolder} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useExams} from "../../hooks/admin/useExams";
import type {ExamOption} from "../../types/examOption";
import {useExamOptions} from "../../hooks/admin/useExamOptions";

const ExamQuestionsPage = () => {
  // Importacion para usar el ID de la url como parametro
  const {examId} = useParams();

  // Importacion de navigate para navegar entre paginas
  const navigate = useNavigate();

  // Exportacion de metodos del hook useQuestions
  const {
    questions,
    loading,
    error,
    fetchQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    fetchQuestionsByExam,
  } = useQuestions();

  // Estados para la visibilidad
  const [opcionesVisibles, setOpcionesVisibles] = useState<Set<number>>(
    new Set(),
  );
  const [mostrarFormNuevaOpcion, setMostrarFormNuevaOpcion] = useState<
    Set<number>
  >(new Set());

  // 
  const [nuevaOpcion, setNuevaOpcion] = useState<Record<number, string>>({});

  // Estado para modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para guardar Id en edicion y en busqueda
  const [editResultId, setEditingResultId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState<number | "">("");

  // Estado para traer el Examen para el titulo
  const {fetchExamById} = useExams();
  const [examTitle, setExamTitle] = useState<string>("");

  // Estado para mostrar las opciones por pregunta
  const [opcionesPorPregunta, setOpcionesPorPregunta] = useState<
    Record<number, ExamOption[]>
  >({});

  // Estado para mostrar las opciones editables
  const [opcionesEditables, setOpcionesEditables] = useState<
    Record<number, ExamOption[]>
  >({});

  // Estado para obtener opciones por el id de pregunta
  const {fetchOptionsByQuestions, createExamOption} = useExamOptions();

  // Estado para mostrar las preguntas
  const [displayedQuestions, setDisplayedQuestions] = useState<Question[]>([]);

  // crear question DATA
  const [formData, setFormData] = useState({
    pregunta: "",
    correct_option_id: 0,
  });

  // crear options DATA
  const [optionData, setOptionData] = useState({
    question_id: 0,
    opcion: "",
    orden: 0,
  });

  // funciones de botones (EDITAR)
  const handleEditingClick = (question: Question) => {
    setEditingResultId(question.id);
    setFormData({
      pregunta: question.pregunta, 
      correct_option_id: question.correct_option_id,
    });
    setIsModalOpen(true);
  };

  // Traemos los examenes
  useEffect(() => {
    if (!examId) return;

    // Fetch examen por id
    fetchExamById(Number(examId)).then((exam) => {
      if (exam) setExamTitle(exam.titulo);
    });

    // Fetch preguntas del examen
    fetchQuestionsByExam(Number(examId));
  }, [examId]);


  // Use effect para buscar por id
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

        {/* Botón guardar cambios */}
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
          onClick={async () => {
            if (!examId) return;

            try {
              const examIdNumber = Number(examId);

              // Solo actualizamos las preguntas existentes
              const updates = displayedQuestions.map((q) => {
                return updateQuestion(q.id, {
                  exam_id: examIdNumber,
                  pregunta: q.pregunta,
                  correct_option_id: q.correct_option_id,
                });
              });

              await Promise.all(updates); // Esperamos a que todas terminen
              toast.success("Todas las preguntas actualizadas correctamente");

              // Refrescamos la lista desde el backend
              fetchQuestionsByExam(examIdNumber);
            } catch (err) {
              console.error(err);
              toast.error("Error al actualizar las preguntas");
            }
          }}
        >
          Guardar cambios
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="rounded bg-green-400 px-4 py-2 text-white hover:bg-green-500"
          onClick={() => {
            setEditingResultId(null);
            setFormData({
              pregunta: "",
              correct_option_id: 0,
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

      <div className="flex flex-col gap-4">
        {displayedQuestions.map((q) => (
          <div key={q.id} className="flex justify-between gap-5 w-full">
            {/* IZQUIERDA */}
            <div className="flex flex-col rounded w-3/4 bg-gray-200 px-8 py-5 gap-3">
              <p className="rounded text-xl text-black">Pregunta {q.id}</p>
              <textarea
                className="border rounded bg-white w-full"
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

              <div>
                <button
                  className="cursor-pointer bg-green-400 rounded text-white px-4 py-2 text-sm"
                  onClick={async () => {
                    // si ya esta visible solo ocultamos

                    if (opcionesVisibles.has(q.id)) {
                      setOpcionesVisibles((prev) => {
                        const next = new Set(prev);
                        next.delete(q.id);
                        return next;
                      });
                      return;
                    }

                    // si no estan cargadas hacemos fetch a options
                    try {
                      if (!opcionesPorPregunta[q.id]) {
                        const options = await fetchOptionsByQuestions(q.id);
                        setOptionData({
                          question_id: q.id,
                          opcion: "",
                          orden: (options?.length ?? 0) + 1,
                        });
                        setOpcionesPorPregunta((prev) => ({
                          ...prev,
                          [q.id]: options ?? [],
                        }));
                        setOpcionesEditables((prev) => ({
                          ...prev,
                          [q.id]: options ?? [],
                        }));
                      }
                      setOpcionesVisibles((prev) => new Set(prev).add(q.id));
                    } catch (error) {
                      console.error(error);
                      toast.error("Error al traer opciones");
                    }
                  }}
                >
                  {opcionesVisibles.has(q.id)
                    ? "Ocultar opciones"
                    : "Mostrar opciones"}
                </button>
              </div>

              {opcionesVisibles.has(q.id) && (
                <div className="mt-4 bg-white rounded p-4 shadow-sm">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Opciones:
                  </h3>

                  {opcionesPorPregunta[q.id]?.length === 0 && (
                    <p className="text-gray-400 text-sm">
                      No hay opciones registradas
                    </p>
                  )}

                  {opcionesPorPregunta[q.id]?.map((opt) => (
                    <div
                      key={opt.id}
                      className={`flex justify-between items-center border rounded p-2 mb-2 ...`}
                    >
                      <input
                        type="text"
                        value={
                          opcionesEditables[q.id]?.find((o) => o.id === opt.id)
                            ?.opcion ?? ""
                        }
                        onChange={(e) =>
                          setOpcionesEditables((prev) => ({
                            ...prev,
                            [q.id]: prev[q.id].map((o) =>
                              o.id === opt.id
                                ? {...o, opcion: e.target.value}
                                : o,
                            ),
                          }))
                        }
                        className="border rounded px-2 py-1 text-sm w-1/2"
                      />

                      <input
                        type="number"
                        value={
                          opcionesEditables[q.id]?.find((o) => o.id === opt.id)
                            ?.orden ?? 0
                        }
                        onChange={(e) =>
                          setOpcionesEditables((prev) => ({
                            ...prev,
                            [q.id]: prev[q.id].map((o) =>
                              o.id === opt.id
                                ? {...o, orden: Number(e.target.value)}
                                : o,
                            ),
                          }))
                        }
                        className="border rounded px-2 py-1 text-sm w-16"
                      />

                      {q.correct_option_id === opt.id && (
                        <span className="text-green-600 font-semibold text-sm">
                          Correcta
                        </span>
                      )}
                    </div>
                  ))}

                  <div className="flex justify-center bg-blue-500 rounded">
                    <button
                      onClick={() => {
                        setMostrarFormNuevaOpcion((prev) => {
                          const next = new Set(prev);
                          prev.has(q.id) ? next.delete(q.id) : next.add(q.id);
                          return next;
                        });
                      }}
                      className="cursor-pointer text-white px-4 py-2 text-sm"
                    >
                      + Agregar opción
                    </button>
                  </div>
                </div>
              )}

              {mostrarFormNuevaOpcion.has(q.id) && (
                <div className="flex gap-2 items-center border rounded p-2 mt-2 bg-yellow-50">
                  <input
                    type="text"
                    placeholder="Nueva opción..."
                    value={nuevaOpcion[q.id] ?? ""}
                    onChange={(e) =>
                      setNuevaOpcion((prev) => ({
                        ...prev,
                        [q.id]: e.target.value,
                      }))
                    }
                    className="border rounded px-2 py-1 text-sm w-1/2"
                  />
                  <button
                    onClick={async () => {
                      try {
                        await createExamOption({
                          question_id: q.id,
                          opcion: nuevaOpcion[q.id] ?? "",
                          orden: (opcionesPorPregunta[q.id]?.length ?? 0) + 1,
                        });

                        // refrescar opciones
                        const updated = await fetchOptionsByQuestions(q.id);
                        setOpcionesPorPregunta((prev) => ({
                          ...prev,
                          [q.id]: updated ?? [],
                        }));
                        setOpcionesEditables((prev) => ({
                          ...prev,
                          [q.id]: updated ?? [],
                        }));

                        // limpiar y ocultar form
                        setNuevaOpcion((prev) => ({...prev, [q.id]: ""}));
                        setMostrarFormNuevaOpcion((prev) => {
                          const next = new Set(prev);
                          next.delete(q.id);
                          return next;
                        });

                        toast.success("Opción creada exitosamente!");
                      } catch (error) {
                        toast.error("No se pudo crear la opción");
                      }
                    }}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Guardar
                  </button>
                </div>
              )}
            </div>

            {/* DERECHA */}
            <div className="w-1/4 bg-gray-200 p-4 rounded flex flex-col gap-3">
              {/* aquí puedes poner botones, select, info, etc */}

              <div className="flex flex-col gap-2">
                <label>Tipo de Pregunta</label>
                <div>
                  <select name="" id="">
                    <option value="">-- Seleccione tipo ---</option>
                    <option value="">Seleccion multiple</option>
                    <option value="">Seleccion Unica</option>
                  </select>
                </div>
              </div>

              <div className="">
                <label className="">Puntos</label>
                <div className="flex gap-5">
                  <input type="text" placeholder="Puntos" />
                  <p>Ptos</p>
                </div>
              </div>

              <div>
                <button
                  className="cursor-pointer bg-red-500 text-white rounded-lg px-4 py-2"
                  onClick={async () => {
                    try {
                      await deleteQuestion(q.id);
                      toast.success("Pregunta eliminada correctamente");
                    } catch (error) {
                      console.error(error);
                      toast.error("Error al eliminar la pregunta");
                    }
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
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
                      correct_option_id: Number(e.target.value),
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
                          correct_option_id: formData.correct_option_id || 0, // si agregas campo respuesta_correcta
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
  );
};

export default ExamQuestionsPage;
