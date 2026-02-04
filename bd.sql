CREATE TABLE users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM("estudiante", "docente", "admin") NOT NULL,
    nivel INT DEFAULT 1,
    puntos INT DEFAULT 0,
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    grado ENUM('primaria','secundaria') NOT NULL,
    imagen_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    titulo VARCHAR(150),
    orden INT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    module_id INT,
    titulo VARCHAR(150),
    tipo ENUM('texto','video','imagen','simulacion'),
    contenido TEXT,
    orden INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (module_id) REFERENCES modules(id)
);


CREATE TABLE exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    titulo VARCHAR(150),
    duracion_minutos INT,
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exam_id INT NOT NULL,
    pregunta TEXT,
    respuesta_correcta VARCHAR(255),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);

CREATE TABLE exam_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    opcion VARCHAR(255),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE exam_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    exam_id INT,
    puntaje INT,
    total_preguntas INT,
    correctas INT,
    duracion_usada INT, -- segundos
    completado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (exam_id) REFERENCES exams(id)
);


CREATE TABLE badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    icono_url VARCHAR(255)
);

CREATE TABLE user_badges (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    obtenido_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (badge_id) REFERENCES badges(id)
);

CREATE TABLE points_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    puntos INT,
    motivo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);







