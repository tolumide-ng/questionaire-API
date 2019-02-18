const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// If environment is 'test' use the ...url_test link else use the main database
const theDatabaseUrl = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

const pool = new Pool({
    connectionString: theDatabaseUrl
});

module.exports = {
    query(text, params) {
        return new Promise((resolve, reject) => {
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