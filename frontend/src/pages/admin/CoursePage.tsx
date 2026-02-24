import {useEffect, useState} from "react";
import {useCourses} from "../../hooks/core/useCourses";
import type {Course, CourseDTOCreate} from "../../types/course";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CoursePage = () => {
  const navigate = useNavigate();
  const GRADOS = [
    {value: "primaria", label: "Primaria"},
    {value: "secundaria", label: "Secundaria"},
  ];
  const {
    course,
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  } = useCourses();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editResultId, setEditingResultId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState<number | "">("");

  const [formData, setFormData] = useState<CourseDTOCreate>({
    titulo: "",
    descripcion: "",
    grado: "primaria",
    imagen_url: "",
  });

  const [displayedCourses, setDisplayedCourses] = useState<Course[]>([]);

  // Funcion Editar
  const handleEditClick = (course: Course) => {
    setEditingResultId(course.id);
    setFormData({
      titulo: course.titulo,
      descripcion: course.descripcion,
      grado: course.grado,
      imagen_url: course.imagenUrl,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setDisplayedCourses(courses);
  }, [courses]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Cargando cursos...</p>
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
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Administrador de Cursos
        </h1>
        <p className="text-gray-500 text-sm">
          Visualiza los cursos, actualizalos, eliminalos o crea uno
        </p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2 items-center">
          {/*INPUT DE BUSQUEDA ID */}

          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border px-2 py-2 rounded w-32"
          />
          {/*BOTON DE BUSCAR */}

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={async () => {
              if (searchId !== "") {
                const result = await fetchCourseById(searchId);
                if (result) {
                  setDisplayedCourses([result]);
                } else {
                  setDisplayedCourses([]);
                }
              } else {
                setDisplayedCourses(courses);
              }
            }}
          >
            Buscar
          </button>
          {/*BOTON DE RESET */}
          <button
            className=" rounded bg-gray-300 px-4 py-2 text-white hover:bg-gray-400"
            onClick={() => {
              setSearchId("");
              fetchCourses();
            }}
          >
            Reset
          </button>
        </div>
        {/*BOTON DE CREAR EXAMEN */}

        <button
          className=" rounded bg-green-400 px-4 py-2 text-white hover:bg-green-500"
          onClick={() => {
            setEditingResultId(null);
            setFormData({
              titulo: "",
              descripcion: "",
              grado: "primaria",
              imagen_url: "",
            });
            setIsModalOpen(true);
          }}
        >
          Crear Curso +
        </button>
      </div>

      <div className="bg-white shadow rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Titulo</th>
                <th className="px-6 py-3 text-left">Descripcion</th>
                <th className="px-6 py-3 text-left">Grado</th>
                <th className="px-6 py-3 text-left">Imagen</th>
                <th className="px-6 py-3 text-left">Modulos</th>
                <th className="px-6 py-3 text-left">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {displayedCourses.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    No hay cursos registrados
                  </td>
                </tr>
              )}
              {displayedCourses.map((course) => {
                return (
                  <tr key={course.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">{course.id}</td>
                    <td className="px-6 py-4">{course.titulo}</td>
                    <td className="px-6 py-4">{course.descripcion}</td>
                    <td className="px-6 py-4">{course.grado}</td>
                    <td className="px-6 py-4">{course.imagenUrl}</td>
                    {/* LE PASAMOS EL ID DEL EXAMEN PARA RENDERIZAR QUESTIONS */}
                    <td
                      className="px-6 py-4 text-blue-500 cursor-pointer hover:underline"
                      onClick={() =>
                        navigate(`/admin/courses/${course.id}/modules`)
                      }
                    >
                      {course.modules_count}
                    </td>                    {/* BOTONES DE EDITAR Y ELIMINAR */}
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleEditClick(course)}
                      >
                        Editar
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        onClick={async () => {
                          try {
                            await deleteCourse(course.id);
                            toast.success("Curso eliminado correctamente");
                          } catch (error) {
                            console.error(error);
                            toast.error("Error al eliminar el curso");
                          }
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
                <h2 className="text-xl font-bold mb-4">
                  {editResultId !== null ? "Editar Curso" : "Crear Curso"}
                </h2>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Examen
                    </label>
                  </div>
                  <select
                    value={formData.grado}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        grado: e.target.value as CourseDTOCreate["grado"],
                      })
                    }
                    className="border px-3 py-2 rounded w-full"
                  >
                    <option value="">Seleccionar grado</option>

                    {GRADOS.map((grado) => (
                      <option key={grado.value} value={grado.value}>
                        {grado.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titulo
                  </label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        titulo: String(e.target.value),
                      })
                    }
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Descripcion
                  </label>
                  <input
                    type="text"
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        descripcion: String(e.target.value),
                      })
                    }
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Imagen
                  </label>
                  <input
                    type="text"
                    value={formData.imagen_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        imagen_url: String(e.target.value),
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
                    className="bg-green-500 hover:bg-green-500 text-white px-4 py-2 rounded"
                    onClick={async () => {
                      try {
                        if (editResultId !== null) {
                          await updateCourse(editResultId, formData);
                          toast.success("Curso actualizado correctamente");
                        }else{
                            await  createCourse(formData);
                            toast.success("Curso creado correctamente");
                        }
                        setIsModalOpen(false);
                        setEditingResultId(null);
                        fetchCourses();
                      } catch (error) {
                        console.error(error);
                        toast.error("Error al guardar el curso")
                      }
                    }}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
