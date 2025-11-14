import jwt from "jsonwebtoken";

const createJWTToken = (register) => {
    delete register.password;
    const token = jwt.sign({ register }, process.env.JWT_SECRET, {
        expiresIn: "6h",
    });
    return token;
};

export { createJWTToken };
