require("@babel/polyfill");
const db = require('./index');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const { createTable, dropTable } = require('./queries');

// Enable search for variables in .env
dotenv.config();

// If environment is 'test' use the ...url_test link else use the main database
const theDatabaseUrl = process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL

const pool = new Pool({
    connectionString: theDatabaseUrl
});

pool.on('connect', () => {
    console.log('connected to the db');
});


// CREATE THE TABLE

const createTheTables = async () => {
    try {
        await db.query(createTable.userTable);
        await db.query(createTable.meetupTable);
        await db.query(createTable.questionTable);
        await db.query(createTable.rsvpTable);
        await db.query(createTable.commentsTable);
    } catch (err) {
        console.log(`${err.name}, ${err.message}`)
    }
}

const dropTheTables = async () => {
    try {
        await db.query(dropTable.userTable);
        await db.query(dropTable.meetupTable);
        await db.query(dropTable.questionTable);
        await db.query(dropTable.rsvpTable);
        await db.query(dropTable.commentsTable);
    } catch(err) {
        console.log(`${err.name}, ${err.message}`)
    }
}

module.exports = {
    createTheTables,
    dropTheTables
}

require('make-runnable');
