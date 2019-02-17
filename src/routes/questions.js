import express from 'express';
import questionControllers from './../usingDB/controllers/questionsControllers';
import questionHelpers from './../helpers/questionHelpers';

const router = express.Router();
const { validateBody, schemas } = questionHelpers;

router.post('/', validateBody(schemas.authSchema), questionControllers.createQuestion);
router.patch('/:id/upvote', questionControllers.upvoteQuestion);
router.patch('/:id/downvote', questionControllers.downvoteQuestion);


export default router;
