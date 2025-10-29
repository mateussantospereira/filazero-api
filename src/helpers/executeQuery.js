const connection = require("../database/connection");

const executeQuery = async (sql, params = []) => {
    try {
        const [rows] = await connection.execute(sql, params);
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = executeQuery;
