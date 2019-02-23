import jwt from 'jsonwebtoken';
import db from './../db/index';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const signToken = rows => {
    return jwt.sign({
        iss: 'tolumide',
        sub: rows[0].id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET)
}

const helper = {
    async hashPassword(password) {
        return bcrypt.hash(password, await bcrypt.genSalt(10));
    }
}

const User = {
    // Create a User
    async createUser(req, res) {
        const text = `INSERT INTO
        userTable(firstName, password, lastName, otherName, email, phoneNumber, userName, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const {firstName, lastName, password, otherName, email, phoneNumber, userName, isAdmin} = req.value.body;
        const theHashedPassword = await helper.hashPassword(password);
        const values = [firstName, theHashedPassword, lastName,  otherName, email, phoneNumber, userName, isAdmin];

        try {
            const { rows } = await db.query(text, values);
            const token = signToken(rows);
            return res.status(201).json({ status: 201, data: [rows[0]], token });
        } catch (err) {
            return res.status(400).json({ data: 'could not save the user', status: `${err.name}, ${err.message}` });
        }
    },

    // User can login
    async login(req, res) {
        const text = `SELECT * FROM userTable WHERE email=$1`;
        const request = req.value.body;
        const value = [request.email];
        try {
            const { rows } = await db.query(text, value);
            if (!rows[0]) {
                return res.status(404).json({ message: 'User does not exist' });
            }
            const token = signToken(rows);

            return res.status(200).json({ data: rows[0], message: 'login successful', token });
        } catch (err) {
            return res.status(400).json({ message: `${err.name}, ${err.message}` });
        }
    },

    async createComment(req, res) {
        const text = `SELECT * FROM userTable WHERE email=$1`;
        const value = [req.body.email];
        try {
            const { rows } = await db.query(text, value);
            if (!rows[0]) {
                return res.status(401).json({ message: 'Email/Password authentication failed' });
            }
            try {
                const text = `INSERT INTO commentsTable(comment, email, question_id)
                VALUES($1, $2, $3)
                returning *`;
                const request = req.body;
                const values = [request.comment, request.email, request.question];
                const { rows } = await db.query(text, values);
                return res.status(201).json({ status: '201', data: rows });
            } catch (err) {
                return res.status(400).json({ error: `${err.name}, ${err.message}` })
            }
        } catch (err) {
            return res.status(400).json({ error: `${err.name}, ${err.message}` })
        }
    }

}

export default User;