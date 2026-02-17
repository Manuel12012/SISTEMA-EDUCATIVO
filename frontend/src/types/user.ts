export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string,
  rol: Rol;
  avatar_url: string;
};

export interface UserDTOCreate{
  nombre: string;
  email: string;
  password: string;
  rol: Rol;
  avatar_url: string
  
}

export type Rol  = "estudiante" | "docente" | "admin"
