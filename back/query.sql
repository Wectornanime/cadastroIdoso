CREATE DATABASE cadastro_bd;

USE cadastro_bd;

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

INSERT INTO `cadastroidoso` VALUES
('52f34466-1af0-4b42-9408-cd5da6b11dc3','Marcos Andre Cavalcanti Pereira','1970-12-09','145.923.488-41'),
('6e162fb7-62fc-46ef-8078-4b2a5c8b4dbd','Julia Maria Vasconcelos','1977-01-26','111.111.111-11'),
('780c6a2c-faf4-4626-a8d3-aaa7dabb9811','Denise Maria Da Silva','1978-01-02','753.148.932-45');

INSERT INTO `remedios` VALUES
('050cdd69-6b2d-40f5-8643-9f81e834caf1','Venvanse 30mg','sim'),
('1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','Roacutan','nao'),
('23a79fde-3921-45cb-9a65-75d15eb81d19','Aradois 50mg','sim'),
('46c74172-8bc2-486b-90dc-77ef5ff2bc92','Nimesulida','nao'),
('c7507326-eea6-49b3-bffc-a43779231f35','Losartana Potássica 50mg','sim'),
('c84622b3-f02a-4a16-80f5-72267c666ccf','Bronfeniramina','nao'),
('e454eec9-2701-4c8e-aae8-ba3831da0de9','Venvanse 70mg','sim'),
('fff14693-e864-4b04-a949-e7f81920ac72','Prometazina','nao');

INSERT INTO `remedio_idoso` VALUES
('27977220-73b1-4aeb-8351-781a0dc889fa','050cdd69-6b2d-40f5-8643-9f81e834caf1','6e162fb7-62fc-46ef-8078-4b2a5c8b4dbd'),
('45e6325e-2d58-4c81-a9a7-103b50b80068','050cdd69-6b2d-40f5-8643-9f81e834caf1','780c6a2c-faf4-4626-a8d3-aaa7dabb9811'),
('4757ed9c-4d72-47cb-9856-9297d7c7ee40','23a79fde-3921-45cb-9a65-75d15eb81d19','6e162fb7-62fc-46ef-8078-4b2a5c8b4dbd'),
('6d96fd53-f03a-43d2-877b-e4e5dcec3005','050cdd69-6b2d-40f5-8643-9f81e834caf1','52f34466-1af0-4b42-9408-cd5da6b11dc3'),
('c7c827df-96dd-42e2-ac25-f4a8c056302d','1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','6e162fb7-62fc-46ef-8078-4b2a5c8b4dbd'),
('ecccc30a-d970-4ace-8483-400e2b68365f','1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','780c6a2c-faf4-4626-a8d3-aaa7dabb9811'),
('f3ae2f9f-75ea-4e61-b139-7c9ee7082594','e454eec9-2701-4c8e-aae8-ba3831da0de9','52f34466-1af0-4b42-9408-cd5da6b11dc3'),
('f4ee900a-75e9-49ad-8624-fd3438ab378c','1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','52f34466-1af0-4b42-9408-cd5da6b11dc3');




