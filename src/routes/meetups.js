import express from 'express';
import meetupsHelpers from './../helpers/meetupsHelpers';
import meetupsControllers from './../usingDB/controllers/meetupsControllers'

const router = express.Router();
const { validateBody, schemas, schematic} = meetupsHelpers;



router.get('/upcoming/', meetupsControllers.findUpcomingMeetups);
router.post('/:id/rsvps/', meetupsControllers.rsvpsForMeetups);
router.post('/', validateBody(schemas.authSchema), meetupsControllers.createMeetup);
router.get('/', meetupsControllers.findAllMeetups);
router.delete('/deleteall/', meetupsControllers.deleteAllMeetup);
router.get('/:id/', meetupsControllers.findMeetup);
router.delete('/:id/', meetupsControllers.deleteMeetup);

export default router;
