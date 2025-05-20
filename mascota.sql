CREATE TABLE Mascota (
    id_mascota NUMBER PRIMARY KEY,
    nombre VARCHAR2(100),
    especie VARCHAR2(50),
    raza VARCHAR2(50),
    edad NUMBER,
    id_dueño NUMBER,
    FOREIGN KEY (id_dueño) REFERENCES Dueño(id_dueño)
);

CREATE SEQUENCE mascota_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER mascota_trigger
BEFORE INSERT ON Mascota
FOR EACH ROW
BEGIN
    SELECT mascota_seq.NEXTVAL
    INTO :NEW.id_mascota
    FROM dual;
END;
/
