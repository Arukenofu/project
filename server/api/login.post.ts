import pool from "~/utils/pool";

export default defineEventHandler(async (event) => {
    const {email, password} = await readBody(event);

    const db = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);

    if (!(db?.rows[0]?.email === email)) {
        return event.captureError;
    }
    if (!(db?.rows[0]?.password === password)) {
        return;
    }

    setCookie(event, 'email', email, {
        expires: new Date(new Date().getTime() + 15 * 60000)
    });

    setCookie(event, 'password', password, {
        expires: new Date(new Date().getTime() + 15 * 60000)
    })

    setCookie(event, 'username', db.rows[0].username, {
        expires: new Date(new Date().getTime() + 15 * 60000)
    })

    return db.rows[0];
})