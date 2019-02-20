import jwt from 'jsonwebtoken';
import db from './../db/index';
import dotenv from 'dotenv';

dotenv.config();

const signToken = rows => {
    return jwt.sign({
        iss: 'tolumide',
        sub: rows[0].id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, process.env.SECRET)
}


const User = {
    // Create a User
    async createUser(req, res) {
        const text = `INSERT INTO
        userTable(firstName, password, lastName, otherName, email, phoneNumber, userName, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        returning *`;
        const values = [
            req.value.body.firstName,
            req.value.body.password,
            req.value.body.lastName,
            req.value.body.otherName,
            req.value.body.email,
            req.value.body.phoneNumber,
            req.value.body.userName,
            req.value.body.isAdmin
        ];

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
            return res.status(200).json({ data: rows[0], message: 'login successful' });
        } catch (err) {
            return res.status(400).json({ message: `${err.name}, ${err.message}` });
        }
    },

    async createComment(req, res) {
        const text = `SELECT * FROM userTable WHERE id=$1`;
        const value = [req.body.user];
        try {
            const { rows } = await db.query(text, value);
            if (!rows[0]) {
                return res.status(404).json({ message: 'There is no user with this id' });
            }
            try {
                const text = `INSERT INTO commentsTable(comment, user_id, question_id)
                VALUES($1, $2, $3)
                returning *`;
                const request = req.body;
                const values = [request.comment, request.user, request.question];
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