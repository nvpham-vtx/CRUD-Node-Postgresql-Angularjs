DROP DATABASE IF EXISTS chickens;
CREATE DATABASE chickens TEMPLATE template1;

\c chickens;

CREATE TABLE chicks (
    ID SERIAL PRIMARY KEY,
    name VARCHAR,
    age INTEGER,
    sex VARCHAR,
    breed VARCHAR
);

INSERT INTO chicks (name, age, sex, breed)
VALUES ('Tyler',3,'M','Retrieved');
