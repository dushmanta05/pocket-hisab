const express = require('express');
const envConfig = require('./config/env');
const { connectToDatabase } = require('./config/database');

const {
  appConfig: { port },
} = envConfig;

const app = express();

app.get('/hello', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`Backend running on ${port}`);
  await connectToDatabase();
});
