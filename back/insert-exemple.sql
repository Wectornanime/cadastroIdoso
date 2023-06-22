USE `cadastro_bd`;

INSERT INTO `cadastroidoso` VALUES
  ('52f34466-1af0-4b42-9408-cd5da6b11dc3','Marcos Andre Cavalcanti Pereira','1970-12-09','145.923.488-41'),
  ('780c6a2c-faf4-4626-a8d3-aaa7dabb9811','Denise Maria Da Silva','1978-01-02','753.148.932-45'),
  ('c8d2e98f-d554-4987-862d-425753183c0e','Danielle Karen Nascimento','1971-01-30','478.632.147-89');

INSERT INTO `remedios` VALUES
  ('050cdd69-6b2d-40f5-8643-9f81e834caf1','Venvanse 30mg','sim'),
  ('1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','Roacutan','nao'),
  ('23a79fde-3921-45cb-9a65-75d15eb81d19','Aradois 50mg','sim'),
  ('c7507326-eea6-49b3-bffc-a43779231f35','Losartana Potássica 50mg','sim'),
  ('c84622b3-f02a-4a16-80f5-72267c666ccf','Bronfeniramina','nao'),
  ('e454eec9-2701-4c8e-aae8-ba3831da0de9','Venvanse 70mg','sim'),
  ('fff14693-e864-4b04-a949-e7f81920ac72','Prometazina','nao');

INSERT INTO `remedio_idoso` VALUES
  ('6d96fd53-f03a-43d2-877b-e4e5dcec3005','050cdd69-6b2d-40f5-8643-9f81e834caf1','52f34466-1af0-4b42-9408-cd5da6b11dc3'),
  ('f3ae2f9f-75ea-4e61-b139-7c9ee7082594','e454eec9-2701-4c8e-aae8-ba3831da0de9','52f34466-1af0-4b42-9408-cd5da6b11dc3'),
  ('f4ee900a-75e9-49ad-8624-fd3438ab378c','1d88b7da-38dc-405d-a6d2-22cfbc7fcc8d','52f34466-1af0-4b42-9408-cd5da6b11dc3');



