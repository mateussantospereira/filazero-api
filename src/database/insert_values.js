const executeQuery = require("../helpers/executeQuery");
const fs = require("fs");
const path = require("path");
const sqlPath = path.join(__dirname, "values.sql");
const sqlScript = fs.readFileSync(sqlPath, "utf8");

const insert_values = async () => {
    const sql = "SELECT COUNT(*) FROM registers";
    const registers = await executeQuery(sql);

    if (registers[0]["COUNT(*)"] > 0) {
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
        await executeQuery(sql);
        return console.log(`Dados inseridos na tabela ${name}`);
    } catch (error) {
        return console.error(
            `Erro ao inserir os dados na tabela ${name}: ` + error
        );
    }
};

module.exports = insert_values;
