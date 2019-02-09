import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from './../server';
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
})