const routers = require("../routers");
const database = require("../database");
const insert_values = require("../database/insert_values");

module.exports = async (app, express) => {
    await routers(app, express);
    console.log("Banco de dados:");
    await database.init();
    console.log("Inserção de dados:");
    await insert_values();
};
