CREATE DATABASE IF NOT EXISTS db_filazero;

USE db_filazero;

CREATE TABLE IF NOT EXISTS registers (
    name VARCHAR(100) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    gender CHAR(1) NOT NULL CHECK (gender IN ("M", "F")),
    birth DATE NOT NULL,
    email VARCHAR(100) UNIQUE PRIMARY KEY,
    password VARCHAR(200) NOT NULL,
    /* 0: manager, 1: patient, 2: doctor */
    type TINYINT NOT NULL CHECK (type IN (0, 1, 2))
);

CREATE TABLE IF NOT EXISTS hospitals (
    id_hospital INT NOT NULL
        PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    district VARCHAR(100) NOT NULL,
    cep CHAR(9) NOT NULL,
    city VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL,
    address TEXT GENERATED ALWAYS AS (
        CONCAT (
            name, "Rua ", street, ", ", number, "\n",
            "Bairro ", district, "\n",
            cep, " - ", city, " - ", uf
        )
    ) STORED
);

CREATE TABLE IF NOT EXISTS doctors (
    email VARCHAR(100) PRIMARY KEY,
    field VARCHAR(25) NOT NULL,
    id_hospital INT NOT NULL,
    duration TIME NOT NULL,
    FOREIGN KEY (email) 
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (id_hospital) 
        REFERENCES registers(id_hospital)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS schedules (
    id_schedule INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) NOT NULL,
    weekday VARCHAR(13) NOT NULL
        CHECK (weekday IN (
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado"
        )),
    start TIME NOT NULL,
    end TIME NOT NULL,
    break TIME,
    time_break TIME,
    UNIQUE (email, weekday),
    FOREIGN KEY (email)
        REFERENCES doctors(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    id_appointment INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
    email_doctor VARCHAR(100) NOT NULL
        REFERENCES doctors(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    email_patient VARCHAR(100) NOT NULL
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    date DATE NOT NULL,
    start TIME NOT NULL,
    end TIME NOT NULL,
    registered DATETIME CURRENT_DATE,
    UNIQUE (email_doctor, date, start)
);
