import type { Question } from "./question";

export interface Exam{
    id: number;
    course_id: number,
    titulo: string;
    duracion_minutos: number;
    preguntas: Question[];
};

export interface ExamDTOCreate{
    course_id:number,
    titulo: string,
    duracion_minutos: number
}

