import db from './../db/index';

const Question = {
    async createQuestion(req, res) {
        const request = req.value.body;

        try {
            const confirmUserExist = `SELECT * FROM userTable WHERE id=$1`;
            const { rows } = await db.query(confirmUserExist, [request.userId]);
            if (!rows[0]) {
                return res.status(404).json({ message: 'Could not find any user with this Id' });
            }
            try {
                const confirmMeetupExist = `SELECT * FROM meetupTable WHERE id=$1`;
                const { rows } = await db.query(confirmMeetupExist, [request.meetup]);
                if (!rows[0]) {
                    return res.status(404).json({ message: 'Could not find any meetup with this Id' });
                }

                const text = `INSERT INTO questionTable(createdBy, title, body, votes)
                VALUES($1, $2, $3, $4)
                returning *`;
                const values = [request.userId, request.title, request.body, request.votes];

                try {
                    const { rows } = await db.query(text, values);
                    return res.status(201).json({ status: 201, data: [rows[0]] });

                } catch (err) {
                    return res.status(400).json({ data: `I told you the error is from here ${err.name}, ${err.message}` });
                };
            } catch (err) {
                return res.status(400).json({ message: `Maybe from here ${err.name}, ${err.message}` });
            }
        } catch (err) {
            return res.status(400).json({ message: `Howabout here? ${err.name}, ${err.message}` });
        }
    },

    async upvoteQuestion(req, res) {
        const findTheQuestion = `SELECT * FROM questionTable WHERE id=$1`;
        try {
            const { rows } = await db.query(findTheQuestion, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({ message: `There is no question with this id` });
            }
            const newQuestionValue = rows[0].votes + 1;
            try {
                const values = [newQuestionValue, req.params.id];
                const upvoteTheQuestion = `UPDATE questionTable SET votes=$1 WHERE id=$2`;
                const { rows } = await db.query(upvoteTheQuestion, values);
                return res.status(200).json({data: 'Upvote successful', question: rows[0] });
            } catch (err) {
                return res.status(400).json({ message: `${err.name}, ${err.message}` });
            }
           
        } catch (err) {
            return res.status(400).json({ message: ` Howabout this place? ${err.name}, ${err.message}` });
        }
    },

    async downvoteQuestion(req, res) {
        const findTheQuestion = `SELECT * FROM questionTable WHERE id=$1`;
        try {
            const { rows } = await db.query(findTheQuestion, [req.params.id]);
            if (!rows[0]) {
                return res.status(404).json({ messahe: 'There is no question with this id' });
            }
            const newQuestionValue = rows[0].votes - 1;
            try {
                const values = [newQuestionValue, req.params.id];
                const downvoteTheQuestion = `UPDATE questionTable SET votes=$1 WHERE id=$2`;
                const { rows } = await db.query(downvoteTheQuestion, values);
                return res.status(200).json({data: 'Downvote successful', question: rows[0] });
            } catch (err) {
                return res.status(400).json({ message: `${err.name}, ${err.message}` });
            }
        } catch (err) {
            return res.status(400).json({ message: `${err.name}, ${err.message}` });
        }
    }
}

export default Question;