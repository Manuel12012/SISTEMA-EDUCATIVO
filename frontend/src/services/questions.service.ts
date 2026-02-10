import { api } from "./api";
import type { Question } from "../types/question"

export const getQuestions = async (): Promise<Question[]> => {
    const { data } = await api.get<Question[]>("/questions");
    return data;
}

export const getQuestionById = async (id: number): Promise<Question> => {
    const { data } = await api.get<Question>(`/questions/${id}`);
    return data;
}

export const createQuestion = async (question: Omit<Question, "id">):
    Promise<{ message: string, id: number }> => {
    const { data } = await api.post("/questions", question);
    return data;
}

export const updateQuestion = async (id: number, question: Partial<Question>):
    Promise<{ message: string }> => {
    const { data } = await api.put(`/questions/${id}`, question);
    return data;
}

export const deleteQuestion = async (id: number): Promise<{ message: string }> => {
    const { data } = await api.delete(`/questions/${id}`);
    return data;
}