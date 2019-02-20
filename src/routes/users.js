import express from 'express';
import usersHelpers from './../helpers/usersHelpers';
import usersControllers from './../usingDB/controllers/usersControllers';
import passport from 'passport'
import passportConf from './../passport';

const router = express.Router();
const { validateBody, schemas, loginSchema } = usersHelpers;

router.post('/', validateBody(schemas.authSchemas), usersControllers.createUser);
router.post('/login/', validateBody(loginSchema.authSchemas), usersControllers.login);
router.post('/comments/', passport.authenticate('jwt', { session: false }), usersControllers.createComment)


export default router;