import {useEffect, useState} from "react";
import {submitExam, takeExam} from "../../services/exams.service";
import {useParams} from "react-router-dom";
const takeExamPage = () => {
  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const {id} = useParams<{id: string}>();
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const data = await takeExam(Number(id));
        setExam(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [id]);

  const handleSelect = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = async () => {
    if (!exam) return;

    // 🔎 Validar que todas estén respondidas
    if (Object.keys(answers).length !== exam.questions.length) {
      alert("Debes responder todas las preguntas antes de enviar.");
      return;
    }

    const confirmSubmit = window.confirm(
      "¿Estás seguro de que deseas enviar el examen?",
    );

    if (!confirmSubmit) return;

    try {
      setSubmitting(true);

      const data = await submitExam(Number(id), answers);

      setResult(data.result);
    } catch (error: any) {
      alert(error.response?.data?.error || "Error al enviar examen");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Cargando examen...</p>;

  if (result) {
    return (
      <div>
        <h2>Resultado</h2>
        <p>Puntaje: {result.puntaje}%</p>
        <p>
          Correctas: {result.correctas} / {result.total}
        </p>
        <p>Puntos ganados: {result.puntos_ganados}</p>

        <button onClick={() => window.location.reload()}>
          Volver a intentar
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>{exam.exam.titulo}</h1>

      {exam.questions.map((q: any) => (
        <div key={q.id} style={{marginBottom: "20px"}}>
          <h3>{q.pregunta}</h3>

          {q.options.map((opt: any) => (
            <label key={opt.id} style={{display: "block"}}>
              <input
                type="radio"
                name={`question-${q.id}`}
                value={opt.id}
                checked={answers[q.id] === opt.id}
                onChange={() => handleSelect(q.id, opt.id)}
              />
              {opt.opcion}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit} disabled={submitting}>
        {submitting ? "Enviando..." : "Enviar examen"}
      </button>
    </div>
  );
};

export default takeExamPage;
