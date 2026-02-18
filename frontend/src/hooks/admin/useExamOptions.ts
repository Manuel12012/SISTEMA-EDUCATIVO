import { useState } from "react";
import type { ExamOption } from "../../types/examOption";
import { getExamOptions, getExamOptionsById, createExamOption as createExamOptionService, updateExamOption as updateExamOptionService, deleteExamOption as deleteExamOptionService } from "../../services/examOptions.service";
import { getOptionByQuestions } from "../../services/questions.service";


export const useExamOptions = () => {
    //EXAM OPTIONS
    const [examOptions, setExamOptions] = useState<ExamOption[]>([]);
    const [examOption, setExamOption] = useState<ExamOption | null>(null);

    // INTERFAZ DE USUARIO
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // EXAM OPTIONS
    const fetchExamOptions = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getExamOptions();
            setExamOptions(data);
            return data;
        } catch (error) {
            setError("Error al obtener las opciones de los examenes");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchOptionsByQuestions = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getOptionByQuestions(id);
            setExamOptions(data);

            return data;
        } catch (error) {
            setError("Error al obtener la opcion del examen");
        } finally {
            setLoading(false);
        }
    }

    const fetchExamOptionsById = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getExamOptionsById(id);
            setExamOption(data);
        } catch (error) {
            setError("Error al obtener la opcion del examen");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const createExamOption = async (examOption: Omit<ExamOption, "id">) => {
        try {
            setLoading(true);
            setError(null);

            const response = await createExamOptionService(examOption);
            await fetchExamOptions();

            return response;
        } catch (error) {
            setError("Error al crear la opcion del examen");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateExamOption = async (id: number, examOption: Partial<ExamOption>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await updateExamOptionService(id, examOption);
            await fetchExamOptions();

            return response;
        } catch (error) {
            setError("Error al actualizar la opcion del examen");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteExamOption = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await deleteExamOptionService(id);
            await fetchExamOptions();

            return response;
        } catch (error) {
            setError("Error al eliminar la opcion del examen");
            throw error;
        } finally {
            setLoading(false);
        }
    };


    return {
        examOptions,
        examOption,
        loading,
        error,

        fetchExamOptions,
        fetchExamOptionsById,
        createExamOption,
        updateExamOption,
        deleteExamOption,
        fetchOptionsByQuestions
    }
}