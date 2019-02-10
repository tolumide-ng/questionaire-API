import questionsModels from './../models/questionsModels';
import meetupsModels from './../models/meetupsModels';

const Questions = {
    createQuestions(req, res) {
        const request = req.value.body;
        const confirmMeetupExist = meetupsModels.findOneMeetup(request.meetup);
        if(!confirmMeetupExist) {
            return res.status(404).json({message: 'There is no meetup with such ID'})
        }
        const createTheQuestion = questionsModels.createQuestion(request);
        return res.status(201).json({ data: [createTheQuestion]});
    }
}

export default Questions;
