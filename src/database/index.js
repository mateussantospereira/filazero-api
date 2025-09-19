const mysql = require("mysql");
const config = require("./config");
const executeQuery = require("../helpers/executeQuery");

class database {
    async init() {
        await this.createDatabase();
        await this.createTableRegisters();
        await this.createTableDoctors();
        await this.createTableSchedules();
        await this.createTableAppointments();
    }

    async createDatabase() {
        const database = process.env.DB_NAME;
        const sql = `CREATE DATABASE IF NOT EXISTS ${database}`;
        const connection = mysql.createConnection(config.options());

        return new Promise((resolve, reject) => {
            connection.query(sql, (error) => {
                if (error) {
                    return reject(console.log(error));
                }

                return resolve(console.log("Banco de dados criado com êxito"));
            });
        });
    }

    async createTableRegisters() {
        const sql = `
            CREATE TABLE IF NOT EXISTS registers (
                name VARCHAR(100) NOT NULL,
                cpf CHAR(14) NOT NULL UNIQUE,
                gender CHAR(1) NOT NULL CHECK (gender IN ("M", "F")),
                birth DATE NOT NULL,
                email VARCHAR(100) UNIQUE PRIMARY KEY,
                password VARCHAR(200) NOT NULL,
                type TINYINT NOT NULL CHECK (type IN (0, 1, 2))
            );
        `;

        return await this.createTable(sql, "registers");
    }

    async createTableDoctors() {
        const sql = `
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
        `;

        return await this.createTable(sql, "doctors");
    }

    async createTableSchedules() {
        const sql = `
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
        `;

        return await this.createTable(sql, "schedules");
    }

    async createTableAppointments() {
        const sql = `
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
                    ON UPDATE CASCADE,
                date DATE NOT NULL,
                start TIME NOT NULL,
                end TIME NOT NULL,
                UNIQUE (email_doctor, date, start)
            );
        `;

        return await this.createTable(sql, "appointments");
    }

    async createTable(sql, name) {
        try {
            await executeQuery(sql);
            return console.log(`Tabela ${name} criada com sucesso.`);
        } catch (error) {
            return console.error(`Erro ao criar a tabela ${name}: ` + error);
        }
    }
}

module.exports = new database();
