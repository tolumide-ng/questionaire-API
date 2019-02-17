import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import server from './../../server'
import mockData from './mockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeUser, inCompleteUser, wronglyArranged } = mockData;

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

    it('should return a 422 status code for incomplete paramters', (done) => {
        chai.request(server)
            .post('/v1/users')
            .send(inCompleteUser)
            .end((err, res) => {
                res.should.have.status(422);
                res.should.be.json;
                done();
            })
    })
})