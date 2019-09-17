import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

router.get('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  return res.send(message);
});

router.post('/', async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.send(message);
});

router.put('/:messageId', async (req, res) => {
  const message = await req.context.models.Message.findByPk(
    req.params.messageId,
  );
  if (message) {
    message.text = req.body.text;
    await req.context.models.Message.update(message);
  }
  else {
    return res.status(404).send(`messageId ${req.params.messageId} not found`);
  }
});

router.delete('/:messageId', async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });
  console.log(result);
  return res.send(true);
});

export default router;
