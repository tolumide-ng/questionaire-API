import moment from 'moment';
import uuid from 'uuid';

class Questions {
    constructor(){
        this.questions = [];
    }

    createQuestion(data) {
        const theCreatedQuestion = {
            id: uuid.v4(),
            createdOn: new Date(),
            createdBy: data.createdBy,
            meetup: data.meetup, //must be an integer
            title: data.title,
            body: data.body, 
            votes: data.votes
        }
        this.questions.push(theCreatedQuestion);
        return theCreatedQuestion;
    }
    
    findQuestion(data) {
        return this.questions.find(question => question.id === data); 
    }

    upvoteQuestion(data) {
        const findTheQuestion = this.findQuestion(data);
        findTheQuestion.votes += 1;
    }

    downvoteQuestion(data) {
        const findTheQuestion = this.findQuestion(data);
        findTheQuestion.votes -= 1;
    }
}

export default new Questions();