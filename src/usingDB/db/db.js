const { Pool } = require('pg');
const dotenv = require('dotenv');
const { createTable, dropTable } = require('./queries');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**
 * Create Tables
 */
const createTheTables = () => {
    const userTable = `CREATE TABLE IF NOT EXISTS 
    userTable(
    id UUID PRIMARY KEY NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    otherName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    userName VARCHAR(50),
    registered TIMESTAMP,
    isAdmin BOOLEAN NOT NULL DEFAULT false
    )`;
    pool.query(userTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const meetupTable = `CREATE TABLE IF NOT EXISTS
    meetupTable(
    id UUID PRIMARY KEY NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    topic VARCHAR(50) NOT NULL,
    happeningOn DATE NOT NULL,
    tags VARCHAR(255)
    )`;
    pool.query(meetupTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const questionTable = `CREATE TABLE IF NOT EXISTS
    questionTable(
    id UUID PRIMARY KEY NOT NULL,
    createdOn TIMESTAMP NOT NULL,
    createdBy VARCHAR(75) REFERENCES users,
    meetup VARCHAR(75) NOT NULL,
    title VARCHAR(50) NOT NULL,
    body VARCHAR(250) NOT NULL,
    votes INT NOT NULL,
    FOREIGN KEY(createdBy) REFERENCES userTable(id) ON DELETE CASCADE
    )`;
    pool.query(questionTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const rsvpTable = `CREATE TABLE IF NOT EXISTS
    rsvpTable(
    id UUID NOT NULL,
    meetup VARCHAR(75) NOT NULL,
    user VARCHAR(75) NOT NULL,
    response: VARCHAR(50) NOT NULL,
    FOREIGN KEY(meetup) REFERENCES meetupTable(id) ON DELETE CASCADE,
    FOREIGN KEY(user) REFERENCES userTable(id) ON DELETE CASCADE,
    PRIMARY KEY(meetup, user)
    )`;
    pool.query(rsvpTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const commentsTable = `CREATE TABLE IF NOT EXISTS
    commentsTable(
    id UUID PRIMARY KEY NOT NULL,
    comment VARCHAR(255),
    user VARCHAR(50),
    question VARCHAR(255),
    FOREIGN KEY(user) REFERENCES userTable(user) ON DELETE CASCADE,
    FOREIGN KEY(question) REFERENCES questionTable(question) ON DELETE CASCADE
    )`;
    pool.query(commentsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};


/**
 * Drop Tables
 */

const dropTheTables = async () => {
    const userTable = `DROP TABLE IF EXISTS userTable`;
    pool.query(userTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const meetupTable = `DROP TABLE IF EXISTS meetupTable`;
    pool.query(meetupTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });


    const questionTable = `DROP TABLE IF EXISTS questionTable`;
    pool.query(questionTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const rsvpTable = `DROP TABLE IF EXISTS rsvpTable`;
    pool.query(rsvpTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });

    const commentsTable = `DROP TABLE IF EXISTS commentsTable`;
    pool.query(commentsTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
})

module.exports = {
    createTheTables, dropTheTables
}

require('make-runnable');
