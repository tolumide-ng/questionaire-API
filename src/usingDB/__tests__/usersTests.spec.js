import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import uuidv4 from 'uuid/v4';
import server from './../../server'

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const completeUser = {
    uuidv4(),
    firstName: "Lauryl",
    lastName: "Rhonda",
    otherName: "Windsow",
    email: "damiel@gmail.com",
    phoneNumber: 30932210958,
    userName: "RhondaWindsow",
    moment(new Date()),
    isAdmin: true
};

const inCompleteUser = {
    firstName: "Lauryl",
    otherName: "Windsow",
    email: "damiel@gmail.com",
    phoneNumber: 30932210958,
    userName: "RhondaWindsow",
    isAdmin: true
};

const userInformation = {
    "firstName": "Lauryl",
	"lastName": "Rounda",
	"otherName": "Blatynl",
	"email": "lauryl@gmail.com",
	"phoneNumber": 33785982,
	"userName": "olaFlow",
	"isAdmin": true
};




describe('usersControllers', () => {
    it('should return a 201 status code if all paramters are provided', (done) => {
        //First create a User
        chai.request(server)
            .post('/v1/users')
            .send(userInformation)
            .end((err, res) => {
                res.should.have.status(201);
                expect(res).to.be.json;
                const userId = res.body.data[0].id;
                done();
            });
    });


    it('should return a 422 status code if all paramters are not provided', (done) => {
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
