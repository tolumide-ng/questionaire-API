import meetupsModels from './../models/meetupsModels';

const Meetup = {
    createMeetup(req, res) {
        const request = req.value.body;
        const createdMeetup = meetupsModels.createMeetup(request);
        return res.status(201).json({ status: 200, data: [createdMeetup] });
    },

    findMeetup(req, res) {
        console.log(`this is the meetup id : ${req.params.meetup-id}`)
        const findTheMeetup = meetupsModels.findOneMeetup(req.params.meetup-id);
        console.log('here now');
        if (!findTheMeetup) {
            return res.status(404).json({ status: 404, error: 'No meetup with that id:- Please recheck the meetupId' });
        }
        return res.status(200).json({ status: 200, data: [findTheMeetup] })
    }, 
}

export default Meetup;
