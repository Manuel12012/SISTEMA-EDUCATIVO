
export interface Exam {
  id: number;
  course_id: number;
  titulo: string;
  duracion_minutos: number;
  questions_count: number;
}

export interface ExamDTOCreate{
    course_id:number,
    titulo: string,
    duracion_minutos: number
}

