import { api } from "./api";
import type { User } from "../types/user"
import type { ExamResult } from "../types/examResult";

export const getUsers = async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
}

export const getUserById = async (id: number): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
}

export const createUser = async (user: Omit<User, "id">):
    Promise<{ message: string, id: number }> => {
    const { data } = await api.post("/users", user);
    return data;
}

export const updateUser = async (id: number, user: Partial<User>):
    Promise<{ message: string }> => {
    const { data } = await api.put(`/users/${id}`, user);
    return data;
}

export const deleteUser = async (id: number): Promise<{ message: string }> => {
    const { data } = await api.delete(`/users/${id}`);
    return data;
}

export const getResultsByUser = async (userId: number): Promise<ExamResult[]> => {
    const { data } = await api.get<ExamResult[]>(`/users/${userId}/results`);
    return data;
}

