import type { Module } from "./module";

export interface Course{
    id: number;
    titulo: string;
    descripcion: string;
    grado: "primaria" | "secundaria";
    imagenUrl?: string; // el ? significa si no existe colocale undefined
    modulos?: Module[];

}