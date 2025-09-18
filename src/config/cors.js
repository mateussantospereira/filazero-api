const CORS = require("cors");

const cors = CORS({
    origin: ["localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
});

module.exports = cors;
