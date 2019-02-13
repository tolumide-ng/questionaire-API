import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../../server';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('Server endpoints', ()=> {
    it('should return a 200 status code with json body', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res).to.be.json;
                res.body.should.have.property('message')
                done();
            });
    });

    it('should return a 404 status code', (done) => {
        chai.request(server)
            .get('/a/route/that/does/not/exist')
            .end((err, res) => {
                expect(res).to.be.json;
                res.body.should.have.property('error')
                res.should.have.status(404)
                done();
            })
    })
})