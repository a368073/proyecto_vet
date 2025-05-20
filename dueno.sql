CREATE TABLE Due�o (
    id_due�o NUMBER PRIMARY KEY,
    nombre VARCHAR2(100),
    telefono VARCHAR2(20),
    correo VARCHAR2(100)
);

CREATE SEQUENCE due�o_seq START WITH 1 INCREMENT BY 1;

CREATE OR REPLACE TRIGGER due�o_trigger
BEFORE INSERT ON Due�o
FOR EACH ROW
BEGIN
    SELECT due�o_seq.NEXTVAL
    INTO :NEW.id_due�o
    FROM dual;
END;
/
