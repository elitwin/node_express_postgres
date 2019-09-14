import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

export default router;
