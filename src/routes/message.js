import { Router } from 'express';
import uuidv4 from 'uuid/v4';

const router = Router();

router.get('/', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

router.get('/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

router.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
  req.context.models.messages[id] = message;
  return res.send(message);
});

router.put('/:messageId', (req, res) => {
  let message = req.context.models.messages[req.params.messageId];
  if (message) {
    message.text = req.body.text;
    return res.send(message);
  }
  else {
    return res.status(404).send(`messageId ${req.params.messageId} not found`);
  }
});

router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;
  req.context.models.messages = otherMessages;
  return res.send(message);
});

export default router;
