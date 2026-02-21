export interface Question {
    id: number;
    exam_id:number;
    pregunta: string;
    correct_option_id: number;
    option_count: number;
}

export interface QuestionDTOCreate {
  exam_id: number;           // obligatorio
  pregunta: string;          // obligatorio
  correct_option_id: number; // obligatorio
}
