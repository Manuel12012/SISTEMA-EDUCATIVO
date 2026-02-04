import type { Question } from "./question";

export interface Exam{
    id: number;
    titulo: string;
    duracionMinutos: number;
    preguntas: Question[];
}