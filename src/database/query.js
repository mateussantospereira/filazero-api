import pool from "./pool.js";

const query = async (sql, params = []) => {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error("Erro na execução: ", error);
        throw error;
    }
};

export default query;
