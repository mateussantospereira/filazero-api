import "@dotenvx/dotenvx/config";
import insert_values from "../insert_values.js";

(async () => {
    await insert_values();
    return process.exit(1);
})();
