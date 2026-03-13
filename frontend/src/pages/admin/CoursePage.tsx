import {useEffect, useState} from "react";
import {useCourses} from "../../hooks/core/useCourses";
import type {Course, CourseDTOCreate} from "../../types/course";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {MdCreateNewFolder} from "react-icons/md";

const CoursePage = () => {
  const navigate = useNavigate();
  const GRADOS = [
    {value: "primaria", label: "Primaria"},
    {value: "secundaria", label: "Secundaria"},
  ];
  const {
    course,
    lessons,
    courses,
    loading,
    error,
    uploadImageHandler,
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    fetchLessons,
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
      imagen_url: course.imagen_url,
    });
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchCourses();
    fetchLessons();
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
    <div className="p-6 min-h-screen flex flex-col">
      {" "}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Cursos</h1>

        <p className="text-gray-500 text-sm">
          Administra los cursos del sistema educativo{" "}
        </p>
      </div>
      <div className="flex justify-between items-center mb-4">
        {" "}
        <button
          onClick={() => {
            setEditingResultId(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          <MdCreateNewFolder size={20} />
          Crear Curso
        </button>
        <div className="flex gap-2 items-center">
          {/*INPUT DE BUSQUEDA ID */}

          <input
            type="number"
            placeholder="Buscar por ID"
            value={searchId}
            onChange={(e) =>
              setSearchId(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border border-gray-200 px-4 py-2 rounded-lg w-56 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {/*BOTON DE BUSCAR */}

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
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
            className="text-gray-500 hover:text-gray-700 text-sm"
            onClick={() => {
              setSearchId("");
              fetchCourses();
            }}
          >
            Reset
          </button>
        </div>
        {/*BOTON DE CREAR EXAMEN */}
      </div>
      <div className="flex gap-5 items-center mb-10">
        <p className="text-xl font-bold">Todos los Cursos</p>
        <p className="rounded-xl bg-blue-400 text-white px-3 py-1">
          {displayedCourses.length} cursos
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg flex flex-col hover:scale-[1.02]
transition-all duration-200"
          >
            <img
              src={`http://localhost:8000${c.imagen_url}`}
              alt={c.titulo}
              className="w-full h-40 object-cover"
            />

            <div className="p-3 flex flex-col gap-2 flex-1">
              <p className="font-semibold text-gray-800 text-sm">{c.titulo}</p>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 5H11V11H5V5ZM6.5 6.5V9.5H9.5V6.5H6.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 13H11V19H5V13ZM6.5 14.5V17.5H9.5V14.5H6.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 5H19V11H13V5ZM14.5 6.5V9.5H17.5V6.5H14.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 13H19V19H13V13ZM14.5 14.5V17.5H17.5V14.5H14.5Z"
                  />
                </svg>
                <span
                  className=" cursor-pointer"
                  onClick={() => navigate(`/admin/courses/${c.id}/modules`)}
                >
                  {c.modules_count} Módulos
                </span>
              </div>

              {/* badge grado */}
              <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-md w-fit capitalize">
                {c.grado}
              </span>

              <div className="flex justify-between items-center pt-1 mt-auto">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleEditClick(c)}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={async () => {
                    try {
                      await deleteCourse(c.id);
                      toast.success("Curso eliminado correctamente");
                    } catch (error) {
                      console.error();
                      toast.error("Error al eliminar el curso");
                    }
                  }}
                >
                  Borrar
                </button>
              </div>
            </div>
          </div>
        ))}
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
                  type="file"
                  onChange={async (e) => {
                    if (e.target.files?.[0]) {
                      try {
                        const url = await uploadImageHandler(e.target.files[0]);
                        console.log("URL recibida:", url); // 👈 agrega esto temporalmente
                        setFormData({...formData, imagen_url: url});
                      } catch (err) {
                        toast.error("Error al subir la imagen");
                      }
                    }
                  }}
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
                      } else {
                        await createCourse(formData);
                        toast.success("Curso creado correctamente");
                      }
                      setIsModalOpen(false);
                      setEditingResultId(null);
                      fetchCourses();
                    } catch (error) {
                      console.error(error);
                      toast.error("Error al guardar el curso");
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
      <div className="mt-10">
        <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 w-48">
          <p className="text-sm text-gray-500">Lecciones totales</p>

          <p className="text-2xl font-bold text-blue-500">{lessons.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
