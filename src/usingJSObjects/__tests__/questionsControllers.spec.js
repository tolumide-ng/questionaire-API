import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

chai.use(chaiHttp);

const should = chai.should();
const expect = chai.expect;


const theServer = 'http://localhost:3000';

//contains all parameters to create a meetup
const completeMeetup = {
    location: faker.address.city(),
    topic: faker.company.companyName(),
    happeningOn: faker.date.future(),
    tags: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()]
};

//contains partial parameters so makes an uncomplete question
const notCompleteQuestion = {
    createdBy: "Brymo",
    meetup: faker.random.uuid(),
    body: "When I first started blogging, I had always thought that was the end of everything, Like yh?",
    votes: 3
}

// create a question with a non-existing meetupId
const fakeMeetupId = {
    createdBy: "Brymo",
    meetup: faker.random.uuid(),
    title: "the independence of Javascript",
    body: "When I first started blogging, I had always thought that was the end of everything, Like yh?",
    votes: 3
}

// Create a question with all needed parameters
const completeQuestion = {
    createdBy: "",
    meetup: '',
    title: "the independence of Javascript",
    body: "When I first started blogging, I had always thought that was the end of everything, Like yh?",
    votes: 3
}

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



// afterEach((done) => {
//     questionsModels.questions.splice(0, questions.length);
//     done();
// });


describe('Js databse contains data before testing', () => {
    it('should return a 201 status code if question is made on an existing meetup', (done) => {
        //First create a User
        chai.request(theServer)
            .post('/v1/users')
            .set('Accept', '/application/json')
            .send(createRealUser)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                const userId = res.body.data[0].id;

                // Then post a meetup
                chai.request(theServer)
                    .post('/v1/meetups')
                    .set('Accept', '/application/json')
                    .send(completeMeetup)
                    .end((err, res) => {
                        expect(res).to.have.status(201);
                        expect(res).to.be.json;
                        const id = res.body.data[0].id;
                        completeQuestion.meetup = id;
                        completeQuestion.createdBy = userId;


                        // Then post a question using the generated id of the meetup
                        chai.request(theServer)
                            .post('/v1/questions')
                            .set('Accept', '/application/json')
                            .send(completeQuestion)
                            .end((err, res) => {
                                expect(res).to.have.status(201);
                                expect(res).to.be.json;
                                expect(err).be.null;
                                const questionId = res.body.data[0].id;

                                // Upvote the question
                                chai.request(theServer)
                                    .patch(`/v1/questions/${questionId}/upvote`)
                                    .set('Accept', '/application/json')
                                    .end((err, res) => {
                                        expect(res).to.have.status(200);
                                        expect(res).to.be.json;
                                        expect(err).to.be.null;

                                        // Downvote the question
                                        chai.request(theServer)
                                            .patch(`/v1/questions/${questionId}/downvote`)
                                            .set('Accept', '/application/json')
                                            .end((err, res) => {
                                                expect(res).to.have.status(200);
                                                expect(res).to.be.json;
                                                expect(err).to.be.null;


                                                //Upvote a non-existing question
                                                chai.request(theServer)
                                                    .patch(`/v1/questions/${id}/upvote`)
                                                    .set('Accept', '/application/json')
                                                    .end((err, res) => {
                                                        expect(res).to.have.status(404);
                                                        expect(res).to.be.json;
                                                        expect(err).to.be.null;

                                                        // Downvote a non-existing question
                                                        chai.request(theServer)
                                                            .patch(`/v1/questions/${id}/downvote`)
                                                            .set('Accept', '/application/json')
                                                            .end((err, res) => {
                                                                expect(res).to.have.status(404);
                                                                expect(res).to.be.json;
                                                                expect(err).to.be.null;
                                                                done();
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            });
    });
});

// Post a question with incomplete data 
it('should return a 404 status code if all parameters for createQuestion are not properly filled', (done) => {
    chai.request(theServer)
        .post('/v1/questions')
        .set('Accept', '/application/json')
        .send(notCompleteQuestion)
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            done();
        });
})

//Test for a non-existing meetupId
it('should return a 404 status code if all parameters for createQuestion are not properly filled', (done) => {
    chai.request(theServer)
        .post('/v1/questions')
        .set('Accept', '/application/json')
        .send(fakeMeetupId)
        .end((err, res) => {
            expect(res).to.have.status(404);
            expect(res).to.be.json;
            done();
        });
});
