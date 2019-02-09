import meetupsModels from './../models/meetupsModels';

const Meetup = {
    createMeetup(req, res) {
        const request = req.value.body;
        const createdMeetup = meetupsModels.createMeetup(request);
        return res.status(201).json({ status: 200, data: [createdMeetup] });
    },
}

export default Meetup;
