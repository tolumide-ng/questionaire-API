import db from './../db/index';
import uuidv4 from 'uuid/v4';

const Meetup = {
    async createMeetup(req, res) {
        const request = req.value.body;
        const text = `INSERT INTO meetupTable(location, topic, happeningOn, tags)
        VALUES($1, $2, $3, $4)
        returning *`;

        const values = [
            request.location,
            request.topic,
            request.happeningOn,
            request.tags
        ];

        try {
            const { rows } = await db.query(text, values);
            return res.status(201).json({ status: 201, data: [rows[0]] });
        } catch (err) {
            return res.status(400).json({ data: 'could not save the meetup', detailedInfo: `${err.name}, ${err.message}` });
        };
    },

    async findMeetup(req, res) {
        const findTheMeetup = `SELECT * FROM meetupTable WHERE id=$1`;
        try {
            const { rows } = await db.query(findTheMeetup, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({ data: 'There is no meetup with this id on db' });
            }
            return res.status(200).json({ data: rows })
        } catch (err) {
            return res.status(400).json({ detailedInfo: ` ${err.name}, ${err.message}` })
        }
    },

    async findAllMeetups(req, res) {
        const allMeetups = `SELECT * FROM meetupTable`;
        try {
            const { rows, rowCount } = await db.query(allMeetups);
            if (!rows[0]) {
                return res.status(404).json({ status: 404, data: 'There are no meetups in this database' });
            }
            return res.status(200).json({ status: 200, count: rowCount, data: rows })
        } catch (err) {
            return res.status(400).json({ data: 'There are no meetups at the moment', detailedInfo: `${err.name}, ${err.message}` });
        }
    },

    async deleteMeetup(req, res) {
        const deleteMeetup = `DELETE FROM meetupTable WHERE id=$1 returning *`;
        try {
            const { rows } = await db.query(deleteMeetup, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({ status: 404, data: 'meetup not found' });
            }
            return res.status(204).json({ status: 204, data: 'meetup deleted' });
        } catch (err) {
            return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
        }
    },

    async deleteAllMeetup(req, res) {
        const deleteAllMeetups = `DELETE FROM meetupTable`;
        try {
            const { rows } = await db.query(deleteAllMeetups);
            return res.status(204).json({ status: 204, data: 'All meetups deleted', rows })
        } catch (err) {
            return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
        }
    },

    async findUpcomingMeetups(req, res) {
        const upcomingMeetups = `SELECT * FROM meetupTable WHERE happeningOn >= now() ORDER BY happeningOn ASC`;
        try {
            const { rows, rowCount } = await db.query(upcomingMeetups);
            if (!rows[0]) {
                return res.status(404).json({ status: 404, message: 'There are no upcoming meetups' });
            }
            return res.status(200).json({ rows, rowCount });
        } catch (err) {
            return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
        }
    },

    async rsvpsForMeetups(req, res) {
        const request = req.body;
        const confirmMeetupExists = `SELECT * FROM meetupTable WHERE id=$1`;
        const confirmUserExist = `SELECT * FROM userTable WHERE id=$1`;
        try {
            // Confirm if the supplied user exist
            const { rows } = await db.query(confirmUserExist, [request.user]);
            if (!rows[0]) {
                return res.status(404).json({ status: 404, message: 'There is no user with this id, Please register first then RSVP the meetup' });
            }
            // If User Id is valid, then register for the meetup
            try {
                const { rows } = await db.query(confirmMeetupExists, [req.params.id]);
                //confirm if user exist using the request.user submitted
                if (!rows[0]) {
                    return res.status(404).json({ status: 404, message: 'The meetup does not exist' });
                }
                const registerThisMeetup = `INSERT INTO rsvpTable(user_id, meetup_id, status)
                VALUES($1,$2,$3)
                returning *`;
                const values = [
                    req.body.user,
                    req.body.meetup,
                    req.body.status
                ];
                try {
                    const { rows } = await db.query(registerThisMeetup, values);
                    return res.status(201).json({ status: 201, data: rows[0] });
                } catch (err) {
                    return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
                }
            } catch (err) {
                return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
            }
        } catch (err) {
            return res.status(400).json({ detailedInfo: `${err.name}, ${err.message}` });
        }

    }

}

export default Meetup;
