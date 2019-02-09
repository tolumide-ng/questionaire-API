import express from 'express';
import meetupsHelpers from './../helpers/meetupsHelpers';
import meetupsControllers from './../controllers/meetupsControllers';

const router = express.Router();
const { validateBody, schemas} = meetupsHelpers;





router.get('/upcoming', meetupsControllers.findUpcomingMeetups);
router.post('/', validateBody(schemas.authSchema), meetupsControllers.createMeetup);
router.get('/', meetupsControllers.findAllMeetups);
router.get('/:id', meetupsControllers.findMeetup);
router.delete('/:id', meetupsControllers.deleteMeetup);

export default router;
