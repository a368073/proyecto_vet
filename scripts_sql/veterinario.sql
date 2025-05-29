CREATE TABLE Veterinario (
    id_veterinario NUMBER PRIMARY KEY,
    nombre VARCHAR2(100),
    especialidad VARCHAR2(100)
);

CREATE SEQUENCE veterinario_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER veterinario_trigger
BEFORE INSERT ON Veterinario
FOR EACH ROW
BEGIN
    SELECT veterinario_seq.NEXTVAL
    INTO :NEW.id_veterinario
    FROM dual;
END;
/
