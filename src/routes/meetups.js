import express from 'express';
import meetupsHelpers from './../helpers/meetupsHelpers';
import meetupsControllers from './../usingJSObjects/controllers/meetupsControllers';

const router = express.Router();
const { validateBody, schemas} = meetupsHelpers;


router.get('/upcoming', meetupsControllers.findUpcomingMeetups);
router.post('/', validateBody(schemas.authSchema), meetupsControllers.createMeetup);
router.get('/', meetupsControllers.findAllMeetups);
router.get('/:id', meetupsControllers.findMeetup);
router.delete('/:id', meetupsControllers.deleteMeetup);
router.post('/:id/rsvps', meetupsControllers.rsvpsForMeetups);

export default router;
