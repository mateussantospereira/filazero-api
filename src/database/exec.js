import pool from "./pool.js";

const exec = async (sql, params = []) => {
    try {
        const [result] = await pool.execute(sql, params);
        return result;
    } catch(error) {
        console.error("Erro na execução: ", error);
        throw error;
    }
}

export default exec;
