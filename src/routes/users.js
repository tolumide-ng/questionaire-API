import express from 'express';
import usersHelpers from './../helpers/usersHelpers';
import usersControllers from './../usingDB/controllers/usersControllers';

const router = express.Router();
const { validateBody, schemas } = usersHelpers;

router.post('/', validateBody(schemas.authSchemas), usersControllers.createUser);
router.post('/login/', usersControllers.login);
router.post('/comments/', usersControllers.createComment)


export default router;