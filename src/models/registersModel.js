const executeQuery = require("../helpers/executeQuery");

class registersModel {
    async list() {
        const sql = "SELECT * FROM registers";
        return await executeQuery(sql);
    }

    async find(email) {
        const sql = "SELECT * FROM registers WHERE email = ?";
        return await executeQuery(sql, email);
    }

    async create(register) {
        const sql = "INSERT INTO registers SET ?";
        return executeQuery(sql, register);
    }

    async update(register, email) {
        const sql = "UPDATE registers SET ? WHERE email = ?";
        return executeQuery(sql, [register, email]);
    }

    async delete(email) {
        const sql = "DELETE FROM registers WHERE email = ?";
        return await executeQuery(sql, email);
    }
}

module.exports = new registersModel();
