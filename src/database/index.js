const mysql = require("mysql2/promise");
const config = require("./config");
const executeQuery = require("../helpers/executeQuery");
const fs = require("fs");
const path = require("path");
const sqlPath = path.join(__dirname, "database.sql");
const sqlScript = fs.readFileSync(sqlPath, "utf8");

class database {
    async init() {
        await this.createDatabase();
        await this.createTables();
        return true;
    }

    async createDatabase() {
        const database = process.env.DB_NAME;
        const sql = `CREATE DATABASE IF NOT EXISTS ${database}`;
        const connection = await mysql.createConnection(config.options());

        try {
            await connection.query(sql);
            console.log("Banco de dados criado com êxito.");
        } catch (error) {
            console.error("Erro ao tentar criar banco de dados.");
        } finally {
            await connection.end();
        }
    }

    async createTables() {
        const tables = sqlScript
            .split(";")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        for (const table of tables) {
            let name = table
                .split("CREATE TABLE IF NOT EXISTS")
                .map((character) => character.trim())
                .filter((character) => character.length > 0);
            name = name[0].split("(");
            name = name[0].trim();

            await this.createTable(table, name);
        }

        return true;
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
