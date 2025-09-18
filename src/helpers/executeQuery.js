const connection = require("../database/connection");

const executeQuery = async (sql, params = null) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, response) => {
            if (error) {
                console.log(sql);
                console.log(error);
                return reject(error);
            }

            return resolve(response);
        });
    });
};

module.exports = executeQuery;
