CREATE TABLE Dueño (
    id_dueño NUMBER PRIMARY KEY,
    nombre VARCHAR2(100),
    telefono VARCHAR2(20),
    correo VARCHAR2(100)
);

CREATE SEQUENCE dueño_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER dueño_trigger
BEFORE INSERT ON Dueño
FOR EACH ROW
BEGIN
    SELECT dueño_seq.NEXTVAL
    INTO :NEW.id_dueño
    FROM dual;
END;
/
