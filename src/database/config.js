class config {
    connection() {
        const database = { database: process.env.DB_NAME };
        return Object.assign(this.options(), database);
    }

    options() {
        return {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        };
    }
}

export default new config();
