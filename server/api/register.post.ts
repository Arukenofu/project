import pool from "~/utils/pool";

export default defineEventHandler(async (event) => {
    const {username, email, password} = await readBody(event);

    await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password])

    return 'OK!';
})