import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import meetupsModel from './../models/meetupsModels';
import uuid from 'uuid';

const should = chai.should();

chai.use(chaiHttp);

const user = {
    id: uuid.v4(),
    location: faker.address.city,
    topic: faker.company.companyName,
    happeningOn: faker.date.future,
    tags: [faker.lorem.words, faker.lorem.words, faker.lorem.words]
};

describe('Handle all requests to meetupsModels', () => {
    it('should respons with an object', () => {
        const createdMeetup = meetupsModel.createMeetup(user);
        createdMeetup.should.be.an('object');
        createdMeetup.should.have.property('id');
    });

    it('should return an array object', () => {
        const createdMeetup = meetupsModel.createMeetup(user);
        const findOne = meetupsModel.findOneMeetup(createdMeetup.id);
        findOne.should.be.an('object');
        findOne.should.have.property('tags');
    })
})