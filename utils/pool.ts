import {psql} from "~/db/pool";

const pool = new psql({
    user: 'postgres',
    host: 'localhost',
    database: 'auth',
    password: 'rootuser',
    port: 9999
});

export default pool;