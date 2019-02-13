import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

const theServer = 'http://localhost:3000';

// Create a real User with all needed parameters
const createRealUser = {
    firstName: "Lauryl",
	lastName: "Rounda",
	otherName: "Blatynl",
	email: "lauryl@gmail.com",
	phoneNumber: 902333785982,
	userName: "olaFlow",
	isAdmin: true
}

const notRealUser = {
    firstName: "Lauryl",
	lastName: "Rounda",
	email: "lauryl@gmail.com",
	phoneNumber: 902333785982,
	userName: "olaFlow",
	isAdmin: true
}


describe('usersControllers', () => {
    it('should return a 201 status code if all paramters are provided', (done) => {
        //First create a User
        chai.request(theServer)
            .post('/v1/users')
            .set('Accept', '/application/json')
            .send(createRealUser)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                const userId = res.body.data[0].id;
                done();
            });
    });

    it('should return a 400 status code if user is not created successfully', (done) => {
        chai.request(theServer)
            .post('/v1/users')
            .set('Accept', '/application/json')
            .send(notRealUser)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res).to.be.json;
                done();
            });
    });
});