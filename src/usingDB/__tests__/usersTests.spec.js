import chai from 'chai';
import chaiHttp from 'chai-http';
import uuidv4 from 'uuid/v4';
import server from './../../server'
import usersMockData from './mockData/usersMockData';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;
const { completeUser, inCompleteUser, wronglyArranged } = usersMockData;

describe('usersControllers', () => {
    it('should return a 201 status code if all paramters are provided', (done) => {
        //First create a User
        chai.request(server)
            .post('/v1/users')
            .send(completeUser)
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.be.json;
                const userId = res.body.data[0].id;
                done();
            });
    });


    it('should return a 422 status code if all parameters are not provided', (done) => {
        chai.request(server)
            .post('/v1/users')
            .send(inCompleteUser)
            .end((err, res) => {
                res.should.have.status(422);
                expect(res).to.be.json;
                done();
            });
    });
});
