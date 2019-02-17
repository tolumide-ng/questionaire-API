
const createTable = {
    userTable: `CREATE TABLE IF NOT EXISTS
    userTable(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        otherName VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        userName VARCHAR(50),
        registered TIMESTAMP NOT NULL DEFAULT NOW(),
        isAdmin BOOLEAN NOT NULL DEFAULT false
    )`,

    meetupTable: `CREATE TABLE IF NOT EXISTS
    meetupTable(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        location VARCHAR(255) NOT NULL,
        topic VARCHAR(50) NOT NULL,
        happeningOn DATE NOT NULL,
        tags VARCHAR(255)
    )`,

    questionTable: `CREATE TABLE IF NOT EXISTS 
    questionTable(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
        createdBy INT NOT NULL,
        title VARCHAR(50) NOT NULL,
        body VARCHAR(250) NOT NULL,
        votes INT NOT NULL,
        FOREIGN KEY(createdBy) REFERENCES userTable(id) ON DELETE CASCADE
    )`,

    rsvpTable: `CREATE TABLE IF NOT EXISTS
    rsvpTable(
        id INT GENERATED ALWAYS AS IDENTITY,
        user_id INT NOT NULL,
        meetup_id INT NOT NULL,
        status VARCHAR(50) NOT NULL,
        FOREIGN KEY(user_id) REFERENCES userTable(id) ON DELETE CASCADE,
        FOREIGN KEY(meetup_id) REFERENCES meetupTable(id) ON DELETE CASCADE,
        PRIMARY KEY(user_id, meetup_id)
    )`,

    commentsTable: `CREATE TABLE IF NOT EXISTS
    commentsTable(
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        user_id INT NOT NULL,
        question_id INT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES userTable(id) ON DELETE CASCADE,
        FOREIGN KEY(question_id) REFERENCES questionTable(id) ON DELETE CASCADE
    )`,
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
