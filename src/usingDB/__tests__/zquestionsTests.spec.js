import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import mockData from './mockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeMeetup, completeUser, completeQuestion, correctEventDetail } = mockData;


describe('Question controllers', () => {
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

    it('A valid user should be able to upvote a question', () => {
        chai.request(server)
            .patch('v1/questions/1/upvote/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                res.should.be.json;
                done();
            })
    });

    it('A valid user should be able to dowvote a question', () => {
        chai.request(server)
            .patch('v1/questions/1/downvote/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                res.should.be.json;
                done();
            })
    });
});

describe('RSVPS a meetup', () => {
    it('should rsvps a meetup', (done) => {
        chai.request(server)
            .post('/v1/meetups/1/rsvps/')
            .send(correctEventDetail)
            .end((err, res) => {
                res.should.be.json;
                expect(res).to.have.status(201);
                done();
            })
    })
});

