import { Pool } from 'pg';
import { dotenv } from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

export default {
    query(text, params) {
        return new Promise((rersolve, reject) => {
            pool.query(text, params)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}