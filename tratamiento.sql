CREATE TABLE Tratamiento (
    id_tratamiento NUMBER PRIMARY KEY,
    id_consulta NUMBER,
    medicamento VARCHAR2(100),
    dosis VARCHAR2(100),
    duracion VARCHAR2(50),
    FOREIGN KEY (id_consulta) REFERENCES Consulta(id_consulta)
);

CREATE SEQUENCE tratamiento_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER tratamiento_trigger
BEFORE INSERT ON Tratamiento
FOR EACH ROW
BEGIN
    SELECT tratamiento_seq.NEXTVAL
    INTO :NEW.id_tratamiento
    FROM dual;
END;
/
