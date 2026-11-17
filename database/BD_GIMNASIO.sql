
DROP DATABASE IF EXISTS BD_GIMNASIO;
CREATE DATABASE BD_GIMNASIO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE BD_GIMNASIO;
CREATE TABLE tb_plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    mensualidad DECIMAL(8,2) NOT NULL,
    beneficios VARCHAR(500)                    
) ENGINE=InnoDB;


CREATE TABLE tb_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,          
    telefono VARCHAR(20),
    peso DECIMAL(5,2) NULL,
    talla DECIMAL(5,2) NULL,
    rol VARCHAR(50) NOT NULL DEFAULT 'USER',   
    plan_id INT NULL,                          
    sede VARCHAR(100) NULL,                   
    token_recuperacion VARCHAR(255) DEFAULT NULL,  
    CONSTRAINT fk_usuario_plan FOREIGN KEY (plan_id) REFERENCES tb_plan(id)
) ENGINE=InnoDB;


CREATE TABLE tb_servicio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    precio DOUBLE NOT NULL
) ENGINE=InnoDB;

CREATE TABLE tb_reserva (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    servicio_id INT NOT NULL,
    fecha_hora DATETIME(6) NOT NULL,
    estado VARCHAR(255) NOT NULL,              
    CONSTRAINT fk_reserva_usuario FOREIGN KEY (usuario_id) REFERENCES tb_usuario(id),
    CONSTRAINT fk_reserva_servicio FOREIGN KEY (servicio_id) REFERENCES tb_servicio(id)
) ENGINE=InnoDB;


INSERT INTO tb_plan (id, nombre, mensualidad, beneficios) VALUES
(1, 'Plan Básico',  89.00,  'Acceso a la sede elegida;Zona de pesas y cardio;Lunes a sábado'),
(2, 'Plan Plus',    119.00, 'Acceso a las 3 sedes;Todos los días, horario completo;Reserva de rutinas en línea;Evaluación antropométrica'),
(3, 'Plan Premium', 159.00, 'Todo lo del Plan Plus;Rutina personalizada con coach elite;Seguimiento mensual de progreso;Locker inteligente incluido');


INSERT INTO tb_usuario (nombre, correo, contrasena, telefono, peso, talla, rol) VALUES
('Admin FitWeb',           'admin1@fitweb.com',                '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '900000000', 70.0, 170, 'ADMIN'),
('Victor Ramirez',         'vramirez.dev@gmail.com',           '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '912345678', 74.2, 175, 'USER'),
('Leonardo Arriaran',      'leo.arriaran.utp@edu.pe',          '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '981234567', 82.0, 178, 'USER'),
('Maria Fernanda Castro',  'mafercastro.95@gmail.com',         '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '955667788', 61.5, 162, 'USER'),
('Carlos Mendoza',         'cmendoza_arq@hotmail.com',         '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '933445566', 88.7, 180, 'USER'),
('Ana Lucia Torres',       'ana.torres.lima@gmail.com',        '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '999888777', 55.3, 158, 'USER'),
('Jorge Luis Quispe',      'jquispe2026@gmail.com',            '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '922113344', 79.1, 172, 'USER'),
('Diana Carolina Medina',  'dianac.medina@outlook.com',        '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '944775522', 64.8, 165, 'USER'),
('Kevin Flores',           'kevin.flores.tech@gmail.com',      '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '966332211', 70.0, 174, 'USER'),
('Valeria Sofia Gonzales', 'valeria.gonzales.fit@hotmail.com', '$2a$10$/R.Tff8a7Xz0Kr8OPb9hueSkxJj5sXuMd/0o8Qcy83qFf4S6O6RBm', '977441188', 58.9, 160, 'USER');

UPDATE tb_usuario SET plan_id = 1, sede = 'FitWeb Norte'   WHERE correo = 'vramirez.dev@gmail.com';
UPDATE tb_usuario SET plan_id = 2, sede = 'FitWeb Central' WHERE correo = 'leo.arriaran.utp@edu.pe';
UPDATE tb_usuario SET plan_id = 3, sede = 'FitWeb Sur'     WHERE correo = 'mafercastro.95@gmail.com';


INSERT INTO tb_servicio (nombre, descripcion, precio) VALUES
('Yoga', 'Clase grupal de yoga', 30.00),
('Spinning', 'Clase de ciclismo indoor', 25.00),
('Entrenamiento personalizado', 'Sesión con un coach', 60.00);


SELECT * FROM tb_plan;
SELECT * FROM tb_servicio;
SELECT u.id, u.nombre, u.correo, u.rol, p.nombre AS plan, u.sede
FROM tb_usuario u LEFT JOIN tb_plan p ON u.plan_id = p.id;
