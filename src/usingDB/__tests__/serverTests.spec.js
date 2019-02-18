import chai from 'chai';
import chaiHttp from 'chai-http';
import server from './../../server';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


describe('Home endpoints', () => {
    it('should return a status code of 200', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                done();
            })
    })

    it('should return a 404 status code', (done) => {
        chai.request(server)
            .get('/aNonExisting/Route')
            .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                done();
            });
    });
});
