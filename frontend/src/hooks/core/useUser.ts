import { useState } from "react"
import type { User } from "../../types/user"
import {
    getUserById, getUsers, createUser as createUserService,
    updateUser as updateUsersService,
    deleteUser as deleteUserService,
    getResultsByUser
} from "../../services/user.service";
import type { ExamResult } from "../../types/examResult";


export const useUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [userResult, setUserResult] = useState<ExamResult[]>([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setError("Error al obtener los usuarios");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const fetchUserById = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getUserById(id);
            setUser(data);
            return data;
        } catch (error) {
            setError("Error al obtener el usuario");
            throw error;

        } finally {
            setLoading(false);
        }
    }

    const createUser = async (user: Omit<User, "id" | "created_at">) => {
        try {
            setLoading(true);
            setError(null);

            const response = await createUserService(user);
            await fetchUsers();
            return response;
        } catch (error) {
            setError("Error al crear el usuario");
            throw error;

        } finally {
            setLoading(false);
        }
    }

    const updateUser = async (id: number, user: Partial<User>) => {
        try {
            setLoading(true);
            setError(null);

            const response = await updateUsersService(id, user);
            await fetchUsers();
            return response;
        } catch (error) {
            setError("Error al actualizar el usuario");
            throw error;

        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (id: number) => {
        try {
            setLoading(true);
            setError(null);

            const response = await deleteUserService(id);
            await fetchUsers();
            return response;
        } catch (error) {
            setError("Error al eliminar el usuario");
            throw error;

        } finally {
            setLoading(false);
        }
    }

    const fetchResultsByUser = async (userId: number) => {
        try {
            setLoading(true);
            setError(null);

            const data = await getResultsByUser(userId);
            setUserResult(data);
        } catch (error) {
            setError("Error al obtener el resultado");
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        users,
        user,
        userResult,
        loading,
        error,
        fetchUsers,
        fetchUserById,
        createUser,
        updateUser,
        deleteUser,
        fetchResultsByUser
    }

}