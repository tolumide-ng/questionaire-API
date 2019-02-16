import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../../server';
import meetupsMockData from './mockData/meetupsMockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeMeetup, incompleteMeetup } = meetupsMockData;


describe('meetupsControllers', () => {
    // CreateMeetup
    it('should return a 201 status code if the meetup is created successfully', () => {
        chai.request(server)
            .post('v1/meetups')
            .send(completeMeetup)
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.be.json;
                res.body.should.have.property('data');
                done();
            })
    });

    // incomplete parameters for post meetup 
    it('should return a 400 status code if the meetup is NOT created successfully', () => {
        chai.request(server)
            .post('v1/meetups')
            .send(incompleteMeetup)
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.be.json;
                res.body.should.have.property('data');
                done();
            })
    });


    // Find a specific existing meetup
    it('should find the specified meetup', () => {
        chai.request(server)
            .post('v1/meetups')
            .send(completeMeetup)
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.be.json;
                const id = res.body.data[0].id;

                chai.request(server)
                    .get(`v1/meetups/${id}`)
                    .end((err, res) => {
                        res.should.have.status(200);
                        expect(res).to.be.json;
                        done();
                    });
            });

    });

    // Find non-existing meetup
    it('should return a 400 status code from helper', () => {
        chai.request(server)
            .get(`v1/meetups/2w09545mv03-2mnv85n9`)
            .end((err, res) => {
                res.should.have.status(400);
                expect(res).to.be.json;
                done();
            });
    });
    

    // Find all existing meetups
    it('should return a 400 status code from helper', () => {
        chai.request(server)
            .get(`v1/meetups/`)
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                done();
            });
    });

});
