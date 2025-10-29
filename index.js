require("@dotenvx/dotenvx").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const init = require("./src/main/init");

(async () => {
    try {
        await init(app, express);

        app.listen(PORT, () => {
            console.log(`Aplicação na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao tentar iniciar a aplicão:", error);
        process.exit(1);
    }
})();
