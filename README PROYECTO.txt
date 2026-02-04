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
-------------------------------------------------------------

COMO PROBAR POSTMAN

http://localhost/SISTEMA-EDUCATIVO/api/index.php

------------------------------

falta los modelos ()