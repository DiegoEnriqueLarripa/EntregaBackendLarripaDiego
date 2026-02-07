import { Router } from 'express';
import { getAllAdoptions, getAdoption, createAdoption } from '../controllers/adoptions.controller.js';

const router = Router();

router.get('/', getAllAdoptions);
router.get('/:aid', getAdoption);
router.post('/:uid/:pid', createAdoption);

export default router;