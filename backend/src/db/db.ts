import { Pool } from "pg";

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DB,
    password: process.env.PSQL_PASSWORD,
    port: parseInt(process.env.PSQL_PORT || '5432'),
})

export const query = async (queryString: string, queryParams?: string[]) => 
    await pool.query(queryString, queryParams);