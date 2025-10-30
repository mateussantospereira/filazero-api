import exec from "./exec.js";
import query from "./query.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const sqlPath = new URL("./sql/values.sql", import.meta.url);
const sqlScript = fs.readFileSync(sqlPath, "utf8");

const insert_values = async () => {
    const sql = "SELECT COUNT(*) FROM registers";
    const [rows] = await query(sql);
    const registers = rows;

    if (registers["COUNT(*)"] > 0) {
        console.log("Dados já inseridos.");
        return false;
    }

    const values = sqlScript
        .split(";")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

    for (const data of values) {
        let name = data
            .split("INSERT INTO")
            .map((character) => character.trim())
            .filter((character) => character.length > 0);
        name = name[0].split("(");
        name = name[0].trim();

        await insert_in_table(data, name);
    }

    return true;
};

const insert_in_table = async (sql, name) => {
    try {
        await exec(sql);
        return console.log(`Dados inseridos na tabela ${name}`);
    } catch (error) {
        return console.error(
            `Erro ao inserir os dados na tabela ${name}: ` + error
        );
    }
};

export default insert_values;
