import routes from "./routes.js";
import cors from "../config/cors.js";
import * as z from "zod";

export default async (app, express) => {
    app.use(express.json());
    app.use(cors);
    // Tradução do zod para português
    z.config(z.locales.pt());
    app.use("/", routes);
};
