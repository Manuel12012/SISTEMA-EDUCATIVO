import type { Question } from "./question";

export interface Exam{
    id: number;
    course_id: number,
    titulo: string;
    duracionMinutos: number;
    preguntas: Question[];
}

