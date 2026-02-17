import type { Module } from "./module";

export interface Course{
    id: number;
    titulo: string;
    descripcion: string;
    grado: Grado;
    imagenUrl: string; // el ? significa si no existe colocale undefined
    modulos?: Module[];

}


export interface CourseDTOCreate{
    titulo: string,
    descripcion: string,
    grado: Grado,
    imagen_url:string,
}

type Grado = "primaria" | "secundaria";