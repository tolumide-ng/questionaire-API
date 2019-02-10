import moment from 'moment';
import uuid from 'uuid';

class Questions {
    constructor(){
        this.questions = [];
    }

    createQuestion(data) {
        const createdQuestion = {
            id: uuid.v4(),
            createdOn: new Date(),
            createdBy: data.createdy,
            meetup: data.meetup, //must be an integer
            title: data.title,
            body: data.body, 
            votes: data.votes
        }
        this.questions.push(createdQuestion);
        return createdQuestion;
    }
}

export default new Questions();