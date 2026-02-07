import { Router } from 'express';
import {
    getMockingPets,
    getMockingUsers,
    generateMockData
} from '../controllers/mocks.controller.js';

const router = Router();

router.get('/mockingpets', getMockingPets);
router.get('/mockingusers', getMockingUsers);
router.post('/generateData', generateMockData);

export default router;