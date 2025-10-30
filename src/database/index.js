import mysql from "mysql2/promise";
import config from "./config.js";
import exec from "./exec.js";
import fs from "fs";

const sqlPath = new URL("./sql/database.sql", import.meta.url);
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
            await exec(sql);
            return console.log(`Tabela ${name} criada com sucesso.`);
        } catch (error) {
            return console.error(`Erro ao criar a tabela ${name}: ` + error);
        }
    }
}

export default new database();
