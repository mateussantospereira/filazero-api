require("@dotenvx/dotenvx").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const init = require("./src/main/init");

init(app, express);

app.listen(PORT, (error) => {
    if (error) {
        return console.log(error);
    }

    console.log(`Aplicação na porta ${PORT}`);
});
