import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import server from './../../server'
import mockData from './mockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeUser, inCompleteUser, comments } = mockData;

describe('Users Controllers', () => {
    it('should return a 201 status code for successful post', (done) => {
        chai.request(server)
            .post('/v1/users')
            .send(completeUser)
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                done();
            })
    });
});

describe('Incomplete parameters supplied', () => {
    it('should return a 422 status code for incomplete paramters', (done) => {
        chai.request(server)
            .post('/v1/users/')
            .send(inCompleteUser)
            .end((err, res) => {
                res.should.have.status(422);
                res.should.be.json;
                done();
            })
    })
});

describe('login', () => {
    it('should return the users details with a 200 status code', (done) => {
        chai.request(server)
            .post('/v1/users/login/')
            .send({ email: 'damiel@gmail.com', password: 'tomilola' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
    });
})