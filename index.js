import "@dotenvx/dotenvx/config";
import express from "express";
import init from "./src/main/init.js";
const app = express();
const PORT = process.env.PORT;

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
