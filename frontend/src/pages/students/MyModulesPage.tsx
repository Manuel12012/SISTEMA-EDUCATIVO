import {useNavigate, useParams} from "react-router-dom";
import {useModule} from "../../hooks/core/useModule";
import {useEffect, useState} from "react";
import {useCourses} from "../../hooks/core/useCourses";
import type {Lesson} from "../../types/lesson";
import type {Module} from "../../types/module";

const MyModulesPage = () => {
  // recibimos el id
  const {courseId} = useParams();

  const navigate = useNavigate();

  const {
    modules,
    loading,
    error,
    fetchModuleById,
    fetchModules,
    fetchModulesByCourse,
  } = useModule();

  const [leccionesVisibles, setLeccionesVisibles] = useState<Set<number>>(
    new Set(),
  );

  const [searchId, setSearchId] = useState<number | "">("");

  const [courseTitle, setCourseTitle] = useState<string>("");

  const {fetchCourseById, fetchLessonsByModule} = useCourses();

  const [leccionesPorModulo, setLeccionesPorModulo] = useState<
    Record<number, Lesson[]>
  >({});

  const [displayedModules, setDisplayedModules] = useState<Module[]>([]);

  // useEffect
  useEffect(() => {
    if (!courseId) return;

    fetchCourseById(Number(courseId)).then((course) => {
      if (course) setCourseTitle(course.titulo);
    });

    fetchModulesByCourse(Number(courseId));
  }, [courseId]);

  // useEffect
  useEffect(() => {
    setDisplayedModules(modules);
  }, [modules]);

  // manejo de errores
  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );

  // manejo de loading
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Cargando modulos...</p>
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
            Atras
          </button>

          <div>
            <h1 className="text-3xl font-bold">
              Modulos del curso {courseTitle || `#${courseId}`}
            </h1>

            <p className="text-gray-500 text-sm">
              Visualiza los modulos y sus lecciones respectivas
            </p>
          </div>
        </div>

      </div>

      <div className="flex justify-between items-center mb-4">
        <button
          className="rounded bg-green-400 px-4 py-2 text-white hover:bg-green-500"
          onClick={()=>{
            se
          }}  
        >   

        </button>
      </div>
    </div>
  );
};
export default MyModulesPage;
