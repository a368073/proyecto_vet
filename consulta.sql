CREATE TABLE Consulta (
    id_consulta NUMBER PRIMARY KEY,
    id_mascota NUMBER,
    fecha DATE,
    diagnostico VARCHAR2(200),
    observaciones VARCHAR2(300),
    FOREIGN KEY (id_mascota) REFERENCES Mascota(id_mascota)
);

CREATE SEQUENCE consulta_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER consulta_trigger
BEFORE INSERT ON Consulta
FOR EACH ROW
BEGIN
    SELECT consulta_seq.NEXTVAL
    INTO :NEW.id_consulta
    FROM dual;
END;
/
