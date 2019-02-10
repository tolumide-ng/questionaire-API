import express from 'express';
import questionControllers from './../controllers/questionsControllers';
import questionHelpers from './../helpers/questionHelpers';

const router = express.Router();
const { validateBody, schemas} = questionHelpers;

router.post('/', validateBody(schemas.authSchema), questionControllers.createQuestions);


export default router;