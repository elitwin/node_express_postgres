import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import uuidv4 from 'uuid/v4';
import models from './models';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});
app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});
app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});
app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});
app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});
app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`,
  );
});
app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`,
  );
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});
app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});
app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.me.id,
  };
  req.context.models.messages[id] = message;
  return res.send(message);
});
app.put('/messages/:messageId', (req, res) => {
  let message = req.context.models.messages[req.params.messageId];
  if (message) {
    message.text = req.body.text;
    return res.send(message);
  }
  else {
    return res.status(404).send(`messageId ${req.params.messageId} not found`);
  }
});
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.model.messages;
  req.context.models.messages = otherMessages;
  return res.send(message);
});
app.get('/session', (req, res) => {
  return res.send(req.context.models.users[req.context.me.id]);
});

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
