// compile first nbefore recreating table


const createTable = {
    userTable: `CREATE TABLE IF NOT EXISTS
        userTable(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            firstName TEXT NOT NULL,
            password TEXT NOT NULL,
            lastName TEXT NOT NULL,
            otherName TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phoneNumber TEXT NOT NULL,
            userName TEXT,
            registered TIMESTAMP NOT NULL DEFAULT NOW(),
            isAdmin BOOLEAN NOT NULL DEFAULT false
        )`,

    meetupTable: `CREATE TABLE IF NOT EXISTS
        meetupTable(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            location TEXT NOT NULL,
            topic TEXT NOT NULL,
            happeningOn DATE NOT NULL,
            tags TEXT
        )`,

    questionTable: `CREATE TABLE IF NOT EXISTS 
        questionTable(
            question_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
            createdBy INT NOT NULL,
            title VARCHAR(50) NOT NULL,
            body VARCHAR(250) NOT NULL,
            votes INT NOT NULL,
            FOREIGN KEY(createdBy) REFERENCES userTable(id) ON DELETE CASCADE
        )`,

    rsvpTable: `CREATE TABLE IF NOT EXISTS
        rsvpTable(
            id SERIAL NOT NULL UNIQUE,
            user_id INT NOT NULL,
            meetup_id INT NOT NULL,
            status VARCHAR(50) NOT NULL,
            FOREIGN KEY(user_id) REFERENCES userTable(id) ON DELETE CASCADE,
            FOREIGN KEY(meetup_id) REFERENCES meetupTable(id) ON DELETE CASCADE,
            PRIMARY KEY(user_id, meetup_id)
        )`,

    commentsTable: `CREATE TABLE IF NOT EXISTS
        commentsTable(
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            comment VARCHAR(255) NOT NULL,
            email VARCHAR(50) NOT NULL,
            question_id INT NOT NULL,
            FOREIGN KEY(email) REFERENCES userTable(email) ON DELETE CASCADE,
            FOREIGN KEY(question_id) REFERENCES questionTable(question_id) ON DELETE CASCADE
        )`
};

const dropTable = {
    userTable: `DROP TABLE IF EXISTS userTable CASCADE`,
    meetupTable: `DROP TABLE IF EXISTS meetupTable CASCADE`,
    questionTable: `DROP TABLE IF EXISTS questionTable CASCADE`,
    rsvpTable: `DROP TABLE IF EXISTS rsvpTable CASCADE`,
    commentsTable: `DROP TABLE IF EXISTS commentsTable CASCADE`
};


module.exports = {
    createTable,
    dropTable
}
