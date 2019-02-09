import chai from 'chai';
import chaiHttp from 'chai-http'
import uuid from 'uuid';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;

describe('Server.js', ()=> {
    it('should return a 404 status code if request is made to a non-existing endpoint', (done) => {
        chai.request('http://localhost:3000')
            .get('/non-esting-route')
            .end((req, res) => {
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                res.error.should.have.property('message');
                done();
            });
    });
});