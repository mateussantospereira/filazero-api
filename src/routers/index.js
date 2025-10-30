import routes from "./routes.js";
import cors from "../config/cors.js";

export default async (app, express) => {
    app.use(express.json());
    app.use(cors);
    app.use("/", routes);
};
