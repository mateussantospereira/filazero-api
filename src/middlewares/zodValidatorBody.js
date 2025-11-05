import zodValidator from "./zodValidator.js";

const zodValidatorBody = (schema) => (req, res, next) => {
    return zodValidator(schema, req.body, req, res, next);
};

export default zodValidatorBody;
