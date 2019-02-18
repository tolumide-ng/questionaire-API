import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../../server';
import mockData from './mockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeMeetup, incompleteMeetup, completeQuestion, wrongEventDetail, correctEventDetail} = mockData;

describe('Unavailable MeetupControllers', () => {
    beforeEach((done) => {
        chai.request(server)
            .delete('/v1/meetups/deleteall')
            .end((err, res) => {
                done();
            })
    })

    it('should return a status code of 422', (done) => {
        chai.request(server)
            .post('/v1/meetups')
            .send(incompleteMeetup)
            .end((err, res) => {
                res.should.have.status(422);
                res.should.be.json;
                done();
            })
    })

    it('should get a non-existing specific meetup', (done) => {
        chai.request(server)
            .get(`/v1/meetups/120`)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            })
    })

    it('should get a 404 status-code when trying to delete a non-existent meetup', (done) => {
        chai.request(server)
            .delete('/v1/meetups/2145')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            })
    })

    it('should deleteall data in the table', (done) => {
        chai.request(server)
            .get(`/v1/meetups/deleteall`)
            .end((err, res) => {
                res.should.have.status(400);
                res.should.be.json;
                done();
            })
    });

    it('should find all meetups in the database', (done) => {
        chai.request(server)
            .get('/v1/meetups/')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            })
    });

    it('should return a 404 status code if any of the paramters is wrong', (done) => {
        chai.request(server)
            .post('/v1/meetups/abc/rsvps')
            .send(wrongEventDetail)
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            })
    })

    it('should return a 404 status code if there are no upcoming meetups', (done) => {
        chai.request(server)
            .get('/v1/meetups/upcoming')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            });
    });
});



describe('Available Controllers', () => {
    // afterEach((done) => {
    //     chai.request(server)
    //         .delete('/v1/meetups/deleteall')
    //         .end((err, res) => {
    //             done();
    //         })
    // });

    it('should return a 201 status code', (done) => {
        chai.request(server)
            .post('/v1/meetups/')
            .send(completeMeetup)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                done();
            })
    });

    it('should find all existing meetups', (done) => {
        chai.request(server)
            .get('/v1/meetups/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
    });

    it('should find all upcoming meetups', (done) => {
        chai.request(server)
            .get('/v1/meetups/upcoming/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
    });

    it('should be able to ask a question', (done) => {
        chai.request(server)
            .post('/v1/questions/')
            .send(completeQuestion)
            .end((err, res) => {
                expect(res).to.have.status(201);
                res.should.be.json;
                done();
            })
    });

    // it('should get a 201 status code', (done) => {
    //     chai.request(server)
    //         .post(`/v1/meetups/${correctEventDetail.user}/rsvps/`)
    //         .send(correctEventDetail)
    //         .end((err, res) => {
    //             res.should.have.status(201);
    //             res.should.be.json;
    //             done();
    //         })
    // })
});


