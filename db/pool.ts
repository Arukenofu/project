import pg from "pg";

export class psql {
    private pool: pg.Pool;

    constructor(connection: object) {
        this.pool = new pg.Pool(connection)
    }

    async query(text: string, params?: any[]): Promise<{ rows: any[]; rowCount: number | null }> {
        return this.pool.query(text, params);
    }
}