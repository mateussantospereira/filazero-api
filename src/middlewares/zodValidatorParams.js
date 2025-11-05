import zodValidator from "./zodValidator.js";

const zodValidatorParams = (schema) => (req, res, next) => {
    return zodValidator(schema, req.params, req, res, next);
};

export default zodValidatorParams;
