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
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    street VARCHAR(100) NOT NULL,
    number INT NOT NULL,
    district VARCHAR(100) NOT NULL,
    cep CHAR(9) NOT NULL,
    city VARCHAR(100) NOT NULL,
    uf CHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS fields (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS expedients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    duration TIME NOT NULL,
    description VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS weekdays (
    id_expedient INT NOT NULL,
    weekday INT NOT NULL
        CHECK (weekday IN (
            0, 1, 2, 3, 4, 5, 6
            /*
            0: Domingo, 1: Segunda-feira,
            2: Terça-feira, 3: Quarta-feira,
            4: Quinta-feira, 5: Sexta-feira,
            6: Sábado
            */
        )),
    week INT NOT NULL DEFAULT(1),
    start TIME NOT NULL,
    end TIME NOT NULL,
    break TIME,
    time_break TIME,
    FOREIGN KEY (id_expedient)
        REFERENCES expedients(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    PRIMARY KEY(id_expedient, weekday, week)
);

CREATE TABLE IF NOT EXISTS doctors (
    email VARCHAR(100) PRIMARY KEY,
    id_field INT NOT NULL,
    id_hospital INT NOT NULL,
    id_expedient INT NOT NULL,
    first_day DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (email) 
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_field) 
        REFERENCES fields(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_hospital) 
        REFERENCES hospitals(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_expedient) 
        REFERENCES expedients(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email_doctor VARCHAR(100) NOT NULL
        REFERENCES doctors(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    email_patient VARCHAR(100) NOT NULL
        REFERENCES registers(email)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    date DATETIME NOT NULL,
    registered DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (email_doctor, date)
);
