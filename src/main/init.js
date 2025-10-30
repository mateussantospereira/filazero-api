import routers from "../routers/index.js";
import database from "../database/index.js";
import insert_values from "../database/insert_values.js";

const init = async (app, express) => {
    await routers(app, express);
    console.log("Banco de dados:");
    await database.init();
    console.log("Inserção de dados:");
    await insert_values();
};

export default init;
