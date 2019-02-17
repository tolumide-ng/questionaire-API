import faker from 'faker'

export default {
    completeMeetup: {
        location: faker.address.city(),
        topic: faker.lorem.sentence(),
        happeningOn: faker.date.future(),
        tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    },

    incompleteMeetup: {
        location: faker.address.city(),
        happeningOn: faker.date.future(),
        tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    },

    completeUser: {
        firstName: "Lauryl",
        lastName: "Rhonda",
        otherName: "Windsow",
        email: "damiel@gmail.com",
        phoneNumber: 30932210958,
        userName: "RhondaWindsow",
        isAdmin: true
    },

    inCompleteUser: {
        firstName: "Lauryl",
        otherName: "Windsow",
        email: "damiel@gmail.com",
        phoneNumber: 30932210958,
        userName: "RhondaWindsow",
        isAdmin: true
    },

    wronglyArranged: {
        email: "lauryl@gmail.com",
        firstName: "Lauryl",
        lastName: "Rounda",
        otherName: "Blatynl",
        userName: "olaFlow",
        phoneNumber: 33785982,
        isAdmin: true
    },

    wrongEventDetail: {
        meetup: 467,
        user: 129,
        status: 'yes'
    },

    correctEventDetail: {
        user: 1,
        meetup: 1,
        status: 'yes'
    }
}