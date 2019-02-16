import faker from 'faker'

export default {
    completeMeetup : {
        location: faker.address.city(),
        topic: faker.lorem.sentence(),
        happeningOn: faker.date.future(),
        tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    },
    
    incompleteMeetup : {
        location: faker.address.city(),
        happeningOn: faker.date.future(),
        tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
    },
}