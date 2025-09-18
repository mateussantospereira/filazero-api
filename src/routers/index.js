const routes = require("./routes");
const cors = require("../config/cors");

module.exports = async (app, express) => {
    app.use(express.json());
    app.use(cors);
    app.use("/", routes);
};
