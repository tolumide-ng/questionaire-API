import questionsModels from './../models/questionsModels';
import meetupsModels from './../models/meetupsModels';

const Questions = {
    createQuestions(req, res) {
        const request = req.value.body;
        const confirmMeetupExist = meetupsModels.findOneMeetup(request.meetup);
        if (!confirmMeetupExist) {
            return res.status(404).json({ message: 'There is no meetup with such ID' })
        }
        const createTheQuestion = questionsModels.createQuestion(request);
        return res.status(201).json({ data: [createTheQuestion] });
    },

    upvoteQuestion(req, res) {
        const findTheQuestion = questionsModels.findQuestion(req.params.id);
        if (!findTheQuestion) {
            return res.status(404).json({ message: 'There is no Question with this id' });
        }
        questionsModels.upvoteQuestion(req.params.id);
        return res.status(200).json({ status: 200, data: [findTheQuestion] });
    },

    downvoteQuestion(req, res) {
        const findTheQuestion = questionsModels.findQuestion(req.params.id);
        if (!findTheQuestion) {
            return res.status(404).json({ message: 'There is no Question with this id' })
        }
        questionsModels.downvoteQuestion(req.params.id);
        return res.status(200).json({ status: 200, data: [findTheQuestion] });
    },
}

export default Questions;
