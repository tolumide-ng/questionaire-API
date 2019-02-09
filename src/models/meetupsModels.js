import moment from 'moment';
import uuid from 'uuid';

class Meetups {
    constructor() {
        this.meetups = [];
    }

    createMeetup(data) {
        const createdMeetup = {
            id: uuid.v4(),
            createdOn: "new Date()",
            location: data.location,
            topic: data.topic,
            happeningOn: data.happeningOn,
            tags: data.tags
        }
        this.meetups.push(createdMeetup);
        return createdMeetup;
    }

    // findOneMeetup (data) {
    //     return this.meetups.find(themeetup => themeetup.id === data.params.meetup-id);
    // }

    // findAllMeetups () {
    //     return this.Meetups;
    // }

    // findUpcomingMeetups(){
    //     return this.meetups.find(theMeetups => new Date(this.meetups.happeningOn) > new Date());
    // }
}

export default new Meetups();
