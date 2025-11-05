import { z } from "zod";

const zodValidator = (schema, data, req, res, next) => {
    try {
        req.body = schema.parse(data);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: "Erro de validação",
                errors: z.flattenError(error),
            });
        }

        console.log(error);

        next(error);
    }
};

export default zodValidator;
