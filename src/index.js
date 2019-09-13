import 'dotenv/config';
import express from 'express';

const app = express();

console.log(process.env.MY_SECRET);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () =>
  console.log('Example app listening on port 3000!'),
);
