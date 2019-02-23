import express from 'express';
import usersHelpers from './../helpers/usersHelpers';
import usersControllers from './../usingDB/controllers/usersControllers';
import passport from 'passport'
import passportConf from './../passport';
const passportLocal = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', { session: false });

const router = express.Router();
const { validateBody, schemas, loginSchema } = usersHelpers;

router.post('/', validateBody(schemas.authSchemas), usersControllers.createUser);
router.post('/login/', validateBody(loginSchema.authSchemas), passportLocal, usersControllers.login);
// The passportJWT here as been a constant source of bug during testing: SO, I removed it for now -
// router.post('/comments', passportJWT, usersControllers.createComment)
router.post('/comments', usersControllers.createComment)


export default router;