import moment from 'moment';
import uuid from 'uuid';

class Meetups {
    constructor() {
        this.meetups = [];
    }

    createMeetup(data) {
        const createdMeetup = {
            id: uuid.v4(),
            createdOn: new Date(),
            location: data.location,
            topic: data.topic,
            happeningOn: data.happeningOn,
            tags: data.tags
        }
        this.meetups.push(createdMeetup);
        return createdMeetup;
    }

    findOneMeetup (data) {
        return this.meetups.find(themeetup => themeetup.id === data);
    }

    findAllMeetups () {
        return this.meetups;
    }

    deleteOneMeetup(data){
        const indexOfMeetup = this.findOneMeetup(data);
        const index = this.meetups.indexOf(indexOfMeetup);
        this.meetups.splice(index, 1);
        return {};
    }

    findUpcomingMeetups(){
        return this.meetups.filter(theMeetups => new Date(theMeetups.happeningOn) > new Date());
    }
}

export default new Meetups();
