import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import uuid from 'uuid';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const completeMeetup = {
    // location: 'Gbagada', 
    // topic: 'Eleniyan Javascript', 
    // happeningOn: '2019/10/01', 
    // tags: ['Influential', ' Educative']
    location: faker.address.city(),
    topic: faker.company.companyName(),
    happeningOn: faker.date.future(),
    tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
};

const incompleteMeetup = {
    location: faker.address.city(),
    happeningOn: faker.date.future(),
    tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
}

const theServer = 'http://localhost:3000';

describe('Meetups Controllers', () => {
    it('should return a 201 status code if all requirements are fullfilled', (done) => {
        chai.request(theServer)
            .post('/v1/meetups')
            .set('Accept', '/application/json')
            .send(completeMeetup)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                done();
            })
    });
});

it('should return a 200 status code if the specified meetup exist', (done) => {
    chai.request(theServer)
        .post('/v1/meetups')
        .set('Accept', '/application/json')
        .send(completeMeetup)
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            const id = res.body.data[0].id;
            console.log(id);


            chai.request(theServer)
                .get(`/v1/meetups/${id}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    res.body.should.have.property('data');
                    done();
                })
        })
});

it('should return a 400 status code of the parameters are not complete', (done) => {
    chai.request(theServer)
        .post('/v1/meetups')
        .send(incompleteMeetup)
        .end((err, res) => {
            expect(res).to.have.status(400);
            done();
        })
});

it('should return a 404 status code if there are no meetups', (done) => {
    chai.request(theServer)
        .get('/v1/meetups')
        .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
        })
})
