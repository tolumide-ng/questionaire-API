import express from 'express';
import meetupsHelpers from './../helpers/meetupsHelpers';
import meetupsControllers from './../controllers/meetupsControllers';

const router = express.Router();
const { validateBody, schemas} = meetupsHelpers;

router.post('/', validateBody(schemas.authSchema), meetupsControllers.createMeetup);
router.get('/:meetup-id', meetupsControllers.findMeetup);
// router.get('/', meetupsControllers.findAllMeetups);
// router.get('/upcoming', meetupsControllers.findUpcomingMeetups);

export default router;
