CREATE DATABASE IF NOT EXISTS db_filazero;

USE db_filazero;

CREATE TABLE IF NOT EXISTS registers (
    name VARCHAR(100) NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ("M", "F")),
    birth DATE NOT NULL,
    email VARCHAR(100) UNIQUE PRIMARY KEY,
    password VARCHAR(200) NOT NULL,
    type TINYINT NOT NULL CHECK (type IN (0, 1, 2))
);


CREATE TABLE IF NOT EXISTS doctors (
    email VARCHAR(100) PRIMARY KEY,
    field VARCHAR(25) NOT NULL,
    hospital VARCHAR(100) NOT NULL,
    duration TIME NOT NULL,
    FOREIGN KEY (email) 
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS schedules (
    id_schedule INT NOT NULL
    PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
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
    UNIQUE (email, weekday)
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
    UNIQUE (email_doctor, date, start)
);
