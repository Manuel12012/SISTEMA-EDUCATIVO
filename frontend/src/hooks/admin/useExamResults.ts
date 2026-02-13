import { useState } from "react";
import type { ExamResult } from "../../types/examResult";
import { getResultsByExam } from "../../services/exams.service";


export const useExamResults = () => {
    //EXAM RESULTS
    const [examResults, setExamResults] = useState<ExamResult[]>([]);

    // INTERFAZ DE USUARIO
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchResultsByExam = async(id: number) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getResultsByExam(id);
            setExamResults(data.examResult);

        } catch (error) {
            setError("Error al obtener los resultados");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        examResults,
        loading,
        error,
        fetchResultsByExam
    }
}