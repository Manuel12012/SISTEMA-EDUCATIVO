export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "estudiante" | "docente" | "admin";
  nivel: number;
  puntos: number;
  avatarUrl?: string;
};
