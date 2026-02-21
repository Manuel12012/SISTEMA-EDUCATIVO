export interface ExamOption{
    id: number;
    question_id: number;
    opcion: string;
    orden: null;
}

export interface ExamOptionDTOCreate{
    question_id: number,
    opcion: string,
    orden: number
}