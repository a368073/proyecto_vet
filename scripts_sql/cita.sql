CREATE TABLE Cita (
    id_cita NUMBER PRIMARY KEY,
    id_mascota NUMBER,
    id_veterinario NUMBER,
    fecha DATE,
    hora VARCHAR2(10),
    motivo VARCHAR2(200),
    FOREIGN KEY (id_mascota) REFERENCES Mascota(id_mascota),
    FOREIGN KEY (id_veterinario) REFERENCES Veterinario(id_veterinario)
);

CREATE SEQUENCE cita_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER cita_trigger
BEFORE INSERT ON Cita
FOR EACH ROW
BEGIN
    SELECT cita_seq.NEXTVAL
    INTO :NEW.id_cita
    FROM dual;
END;
/
