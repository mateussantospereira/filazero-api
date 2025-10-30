import CORS from "cors";

const cors = CORS({
    origin: ["localhost"],
    methods: ["GET", "POST", "PUT", "DELETE"],
});

export default cors;
