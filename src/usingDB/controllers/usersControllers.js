import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from './../db/index';

const User = {
    // Create a meetup
    async createUser(req, res) {
        const text = `INSERT INTO
        userTable(id, firstName, lastName, otherName, email, phoneNumber, userName, registered, isAdmin)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        returning *`;
        const values = [
            uuidv4(),
            req.value.body.firstName,
            req.value.body.lastName,
            req.value.body.otherName,
            req.value.body.email,
            req.value.body.phoneNumber,
            req.value.body.userName,
            moment(new Date()),
            req.value.body.isAdmin
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).json({status: 201, data: [rows[0]]});
        } catch(err) {
          // POORLY ARRANGED SYNTAX
            return res.status(400).json({data: 'could not save the user', status: `${err.name}, ${err.message}`});
        }
    }
}

export default User;