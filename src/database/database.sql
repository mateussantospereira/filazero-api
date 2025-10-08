CREATE DATABASE IF NOT EXISTS db_filazero;

USE db_filazero;

CREATE TABLE IF NOT EXISTS registers (
    name VARCHAR(100) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    gender CHAR(1) NOT NULL CHECK (gender IN ("M", "F")),
    birth DATE NOT NULL,
    email VARCHAR(100) UNIQUE PRIMARY KEY,
    password VARCHAR(200) NOT NULL,
    /* 0: administrador, 1: paciente, 2: médico */
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

CREATE TABLE IF NOT EXISTS fields (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS expedients (
    id_expedient INT NOT NULL
        PRIMARY KEY AUTO_INCREMENT,
    duration TIME NOT NULL,
    description VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS weekdays (
    id_expedient INT NOT NULL,
    weekday VARCHAR(13) NOT NULL
        CHECK (weekday IN (
            0, 1, 2, 3, 5, 6
            /*
            0: Domingo,
            1: Segunda-feira,
            2: Terça-feira,
            3: Quarta-feira,
            4: Quinta-feira,
            5: Sexta-feira,
            6: Sábado
            */
        )),
    week INT NOT NULL DEFAULT(1),
    start TIME NOT NULL,
    end TIME NOT NULL,
    break TIME,
    time_break TIME,
    UNIQUE(weekday, week),
    FOREIGN KEY (id_expedient)
        REFERENCES expedients(id_expedient)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY(expedients, weekday, week)
);

CREATE TABLE IF NOT EXISTS doctors (
    email VARCHAR(100) PRIMARY KEY,
    id_field INT NOT NULL,
    id_hospital INT NOT NULL,
    id_expedient INT NOT NULL,
    first_day DATE NOT NULL CURRENT_DATE,
    FOREIGN KEY (email) 
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_field) 
        REFERENCES registers(id_field)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_hospital) 
        REFERENCES hospitals(id_hospital)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (expedients) 
        REFERENCES expedients(id_expedient)
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
