create database cadastro_bd;

use cadastro_bd;

CREATE TABLE cadastroidoso (
    id CHAR(36) NOT NULL DEFAULT (uuid()),
    name VARCHAR(50),
    birth DATE,
	cpf VARCHAR(14) unique,
    PRIMARY KEY (id)
);

CREATE TABLE remedios (
    id CHAR(36) NOT NULL DEFAULT (uuid()),
    name VARCHAR(30),
    isControled ENUM('sim', 'nao') NOT NULL DEFAULT ('nao'),
    PRIMARY KEY (id)
);

CREATE TABLE remedio_idoso (
	id CHAR(36) NOT NULL DEFAULT (uuid()),
    remedy_id CHAR(36) NOT NULL,
    elderly_id CHAR(36) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_rel_elderly FOREIGN KEY (elderly_id) REFERENCES cadastroidoso(id)
    ON DELETE CASCADE,
    CONSTRAINT fk_rel_remedy FOREIGN KEY (remedy_id) REFERENCES remedios(id)
    ON DELETE CASCADE
);