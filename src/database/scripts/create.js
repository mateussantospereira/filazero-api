import "@dotenvx/dotenvx/config";
import database from "../index.js";

(async () => {
    await database.init();
    return process.exit(1);
})();
