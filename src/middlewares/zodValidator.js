import { z } from "zod";
import { pt } from "zod/locales";

const zodValidator = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body, { errorMap: pt });
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: error.issues(),
            });
        }

        console.log(error);

        next(error);
    }
};

export default zodValidator;
