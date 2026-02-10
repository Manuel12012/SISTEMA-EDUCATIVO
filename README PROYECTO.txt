🧠 Regla mental fácil

🔹 type = opciones posibles
🔹 interface = forma de un objeto

6️⃣ ¿Cuándo usar type y cuándo interface? (regla junior PRO)

Usa:

interface → objetos que vienen del backend

type → unions, aliases, combinaciones

🧠 Regla mental fácil
TIMESTAMP DEFAULT CURRENT_TIMESTAMP

“Guarda cuándo nació este registro”

ENUM(...)

“Este campo SOLO puede ser uno de estos”

❌ Forma insegura (NO hacer):
$sql = "SELECT * FROM users WHERE email = '$email'";

🧠 Resumen brutal

✔ JOIN une datos que viven en tablas distintas
✔ Tabla pivote = relación muchos a muchos
✔ Nunca envíes respuestas correctas al frontend
✔ Backend siempre valida
✔ fetchColumn() = un solo valor


🧠 RESUMEN MENTAL (esto vale oro)

index.php = puerta de entrada

Headers = contrato con el frontend

Router = decide qué código ejecutar

preg_match = rutas dinámicas

Controller = lógica HTTP

Model = datos

6️⃣ Regla de oro para que no te equivoques nunca

JOIN / INNER JOIN → “solo si hay hijos”

LEFT JOIN → “aunque no haya hijos”

JSON = lenguaje común

🧠 Regla de oro que ya estás aplicando bien

🔹 find() → 1 registro
🔹 getByX() → muchos registros
🔹 JOIN solo cuando hay relación directa o tabla pivote

📁 ARCHIVO 1: Router.php

👉 Este archivo NO define rutas
👉 Este archivo EJECUTA rutas

Es el cerebro del sistema de rutas.

5️⃣ Orden correcto del proyecto (ya estás ahí)
1. MODELOS       ✅
2. CONTROLLERS   ✅
3. RUTAS         ← ahora
4. MIDDLEWARE
5. POSTMAN
6. FRONTEND

🧠 Regla de oro (guárdala)

❝ En una API REST, el Router recibe el request
y el Controller recibe los datos ❞
-------------------------------------------------------------

COMO PROBAR POSTMAN

🔜 ¿Qué sigue después de DELETE?

Lo natural ahora es uno de estos:

1️⃣ Validaciones avanzadas (422)
2️⃣ Middleware (auth / roles)
3️⃣ Consumo desde React (fetch / axios)
4️⃣ Paginación y filtros
5️⃣ Soft delete


6️⃣ Resumen conceptual

GET/DELETE → trabajan con ID, no necesitan body.

POST/PUT → trabajan con datos en body JSON, pueden fallar si no se envían correctamente.

Postman “no sabe” qué campos usar → tú debes proveerlos en JSON.

Validar siempre datos en el controlador para evitar warnings y errores fatales.

 !!OJO::Si tienes dos rutas idénticas (GET /courses/{id}), solo la primera registrada se ejecuta → la segunda nunca.

Agregar un subrecurso como /modules hace que la ruta sea única:

GET /courses/{id}          → devuelve información del curso
GET /courses/{id}/modules  → devuelve los módulos de ese curso


7️⃣ Regla definitiva (para tu bloc 🧠)

🔹 El controlador depende del recurso inicial

Empiezas con Question → QuestionController

Empiezas con ExamOption → ExamOptionController

Aunque el resultado final sea otro recurso

📌 Regla para tu bloc

🔹 Un subrecurso debe validar la existencia del recurso padre
🔹 No tener resultados ≠ error
🔹 ID inválido ≠ recurso no encontrado

vale entonces si es valido hacer consultas de hijos hacia padres pero con un join y haciendo uso de su fk y el id del padre(porque este no tiene fk)


Regla mental para el futuro

“¿Qué estoy buscando realmente?”

Historial → PointsHistory

Usuario → User

Curso → Course

Examen → Exam

El resto es acompañante.

💡 Bonus tip (nivel pro)

Si un método empieza a necesitar muchos JOINs, no cambies de modelo:
👉 crea métodos como:

findWithUser

getByUser

getWithRelations

Nunca los muevas a otro modelo solo por el JOIN.


🧠 Regla definitiva (guárdala 🔐)

Controladores NO deben armar datos
Modelos SÍ deben saber cómo obtenerlos

El controlador:

valida

decide qué método llamar

devuelve la respuesta

El modelo:

sabe SQL

sabe JOINs

sabe relaciones


🧠 Regla mental que ya dominas

La tabla intermedia decide la relación,
el JOIN conecta,
el WHERE filtra,
el SELECT decide qué ves.


🧾 Regla mental que ya dominas

ON → cómo se relacionan las tablas

WHERE → qué filas exactas quiero

SELECT → qué datos devuelvo


OJO:
siempre el api.php osea rutas deben tener sus requires de los controladores

los require de cada controlador son importantes, si falta uno o uno esta de mas , falla todo el postman

siempre deben haber datos en la base de datos sino no tendra sneitdo llamar https URL


Frase perfecta para memorizar

await espera la request, data es el resultado, async lo envuelve en Promise



👉 Regla de oro:

📦 Respuesta simple → usa el type directo

🧩 Respuesta compuesta → crea un type nuevo


🔥 En PRODUCCIÓN REAL se hace así

✔️ Services → comunicación
✔️ Hooks → estado + lógica
✔️ Pages → composición
✔️ Components → presentación


🚫 Errores comunes (que tú estás evitando)

❌ API en components
❌ Lógica mezclada con UI
❌ Pages gigantes con todo dentro
❌ Repetir fetch en cada componente


7️⃣ Regla de oro (guárdala)

Services saben hablar con la API
Hooks saben manejar estado y lógica
Pages saben decidir
Components saben mostrar

Si respetas eso → proyecto limpio y escalable.
------------------------------

