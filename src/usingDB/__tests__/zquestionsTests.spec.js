import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import mockData from './mockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeMeetup, anotherCompleteUser, completeQuestion, correctEventDetail, comments, inCompleteQuestion } = mockData;

describe('Incomplete parameters', () => {
    it('should not ask a question', (done) => {
        chai.request(server)
            .post('/v1/questions/')
            .send(inCompleteQuestion)
            .end((err, res) => {
                expect(res).to.have.status(422);
                res.should.be.json;
                done();
            })
    });
})


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
});

describe('RSVPS a meetup', () => {
    it('should rsvps a meetup', (done) => {
        chai.request(server)
            .post('/v1/meetups/1/rsvps')
            .send(correctEventDetail)
            .end((err, res) => {
                res.should.be.json;
                expect(res).to.have.status(201);
                done();
            })
    })
});

describe('Downvote a question', () => {
    it('A valid user should be able to downvote a question', (done) => {
        chai.request(server)
            .patch('/v1/questions/1/downvote/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                res.should.be.json;
                done();
            })
    });
});

describe('Upvote a question', () => {
    it('A valid user should be able to upvote a question', (done) => {
        chai.request(server)
            .patch('/v1/questions/1/upvote/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                res.should.be.json;
                done();
            })
    });
})

describe('COMMENT a created question', () => {
    // let token;
    // before((done) => {
    //     chai.request(server)
    //         .post('/v1/users/login/')
    //         .send({ email: 'damiel@gmail.com', password: 'Owonikoko41980' })
    //         .end((err, res) => {
    //             token = token;
    //             done();
    //         })
    // })
    it('should retun the created comments with status code 201', (done) => {
        chai.request(server)
            .post('/v1/users/login/')
            .send({ email: 'damiel@gmail.com', password: 'Owonikoko41980' })
            .end((err, res) => {
                const token = res.body.token;

                chai.request(server)
                    .post('/v1/users/comments')
                    .set( 'Authorization', `Bearer ${ token }` )
                    .send({
                        question: 1,
                        email: "damiel@gmail.com",
                        comment: "when is this taking place?",
                        password: "Owonikoko41980"
                    })
                    .end((err, res) => {
                        res.should.have.status(201);
                        done();
                    })
            })
    })
})
