const routers = require("../routers");
const database = require("../database");

module.exports = async (app, express) => {
    await routers(app, express);
    await database.init();
};
