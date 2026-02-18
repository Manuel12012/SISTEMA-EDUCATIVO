import { api } from "./api";
import type { ExamResult } from "../types/examResult";
import type { Exam, ExamDTOCreate } from "../types/exam";
import type { SubmitExamResponse } from "../types/submitExam";
import type { Question } from "../types/question";

export type ExamResultResponse = {
    examResult: ExamResult[];
};

export type ExamDetailResponse = {
    exam: Exam;
    questions: {
        id: number;
        options: any[];
    }[];
};

export const getExams = async (): Promise<Exam[]> => {
    const { data } = await api.get<Exam[]>("/exams");
    return data;
};

export const getExamById = async (id: number): Promise<Exam> => {
    const { data } = await api.get<ExamDetailResponse>(`/exams/${id}`);
    const { exam, questions } = data;

    // añadimos questions_count directamente
    return { ...exam, questions_count: questions.length };
};


export const getQuestionsByExam = async (id: number): Promise<Question[]> => {
    const { data } = await api.get<Question[]>(`/exams/${id}/questions`);
    return data;
};

export const createExam = async (
    exam: ExamDTOCreate
): Promise<{ message: string; id: number }> => {
    const { data } = await api.post("/exams", exam);
    return data;
}

export const updateExam = async (
    id: number,
    exam: Partial<Exam>
): Promise<Exam> => {

    const { data } = await api.put(`/exams/${id}`, exam);

    return data;
}

export const deleteExam = async (id: number): Promise<{ message: string }> => {
    const { data } = await api.delete(`/exams/${id}`);
    return data;
}

export const getResultsByExam = async (id: number): Promise<ExamResultResponse> => {
    const { data } = await api.get<ExamResultResponse>(`/exams/${id}/results`);
    return data;
}

// creamos function de submit y le pasamos el id del examen y lo demas como record y payload porque envuelve answers aun no entiendo
export const submitExam = async (id: number, payload: { answers: Record<number, number> }
): Promise<SubmitExamResponse> => {
    const { data } = await api.post(`/exams/${id}/submit`, payload);
    return data;
};
