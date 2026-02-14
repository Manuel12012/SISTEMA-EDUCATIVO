import {useEffect, useState} from "react";
import {useExams} from "../../hooks/admin/useExams";
import type { Exam } from "../../types/exam";

const ExamPage = () => {
  const {
    exams,
    loading,
    error,
    fetchExams,
    fetchExamById,
    createExam,
    updateExam,
    deleteExam,
  } = useExams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editResultId, setEditingResultId] = useState<number | null>(null);
  const [searchId, setSearchId] = useState<number | "">("");


  const[formData, setFormData] = useState({
    titulo: "",
    duracion_minutos: 0,
  }
  );

  const [displayedExams, setDisplayedExams] = useState<Exam[]>([]);


  const handleEditClick = (exam: Exam) =>{
    setEditingResultId(exam.id);
    setFormData({
      titulo: exam.titulo,
      duracion_minutos: exam.duracionMinutos
    });
    setIsModalOpen(true);
  }

  // llamamos a todos los examenes
  useEffect(() => {
    fetchExams();
  }, []);

  // actualizamos los examenes segun cambie el examen
  useEffect(()=>{
    setDisplayedExams(exams);
  },[exams]);

if(loading)
  return(
    <div className="flex justify-center items-center h-[60vh]">
      <p className="text-gray-500 animate-pulse">Cargando examenes...</p>
    </div>
  );

if(error)
  return(
    <div className="p-6">
      <p className="text-red-500 font-semibold">{error}</p>
    </div>
  );


};

export default ExamPage;
