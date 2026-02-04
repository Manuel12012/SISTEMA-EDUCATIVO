export type LessonType = "texto" | "video" | "imagen" | "simulacion";

export interface Lesson{
    id: number;
    titulo: string;
    tipo: LessonType;
    contenido: string; // URL o texto
}
