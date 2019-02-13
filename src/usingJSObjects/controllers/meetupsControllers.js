import meetupsModels from './../models/meetupsModels';
import usersModels from './../models/usersModels'

const Meetup = {
    createMeetup(req, res) {
        const request = req.value.body;
        const createdMeetup = meetupsModels.createMeetup(request);
        return res.status(201).json({ status: 200, data: [createdMeetup] });
    },

    findMeetup(req, res) {
        const findTheMeetup = meetupsModels.findOneMeetup(req.params.id);
        if (!findTheMeetup) {
            return res.status(404).json({ status: 404, error: 'No meetup with that id:- Please recheck the meetupId' });
        }
        return res.status(200).json({ status: 200, data: [findTheMeetup] })
    }, 

    findAllMeetups (req, res) {
        const allMeetups = meetupsModels.findAllMeetups();
        if(allMeetups.length < 1){
            return res.status(404).json({ status: 404, error: 'There are no meetups yet'});
        }
        return res.status(200).json({ status: 200, data: [allMeetups] });
    },

    deleteMeetup (req, res) {
        const theMeetup = meetupsModels.findOneMeetup(req.params.id);
        if(!theMeetup) {
            return res.status(404).json({data: 'this meetup does not exist'});
        }
        const deletedMeetup = meetupsModels.deleteOneMeetup(req.params.id);
        return res.status(204).json({data: 'meetup deleted'});
    },

    findUpcomingMeetups (req, res) {
        const upcomingMeetups = meetupsModels.findUpcomingMeetups();
        if(upcomingMeetups.length < 1 || !upcomingMeetups) { 
            return res.status(404).json({ message: 'There are no upcoming meetups'})
        }
        return res.status(200).json( {status: 200, message: upcomingMeetups} );
    },

    rsvpsForMeetups(req, res) {
        const confirmMeetupExist = meetupsModels.findOneMeetup(req.params.id);
        if(!confirmMeetupExist) {
            return res.status(404).json({message: 'The meetup does not exist' });
        }
        console.log(req.body.status);
        // if(req.body.status != 'yes' || 'no' || 'maybe'){
        //     return res.status(400).json({ message: 'status must be yes||no||maybe'})
        // }
        const request = req.body;
        console.log(request.status);
        request.topic = confirmMeetupExist.topic;
        request.meetup = req.params.id;
        const rsvpsThisMeetup = meetupsModels.rsvpMeetup(request);
        return res.status(201).json({ status: 201, data: rsvpsThisMeetup });
    },
}

export default Meetup;
