import express from 'express';

const app = express();
const port = 8080;

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});
