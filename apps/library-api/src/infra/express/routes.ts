import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    return res.send(new Date());
});

export default router;
