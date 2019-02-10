import express from 'express';
import usersHelpers from './../helpers/usersHelpers';
import usersControllers from './../controllers/usersControllers';

const router = express.Router();
const { validateBody, schemas } = usersHelpers;

router.post('/', validateBody(schemas.authSchemas), usersControllers.createUser);

export default router;