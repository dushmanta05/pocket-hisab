const express = require('express');
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const { connectToDatabase } = require('./config/database');

require('dotenv').config();

const app = express();
const port = 8080;
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5175/',
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
  })
);
app.use('/user', userRoute);

app.listen(port, async () => {
  console.log(`Backend running on ${port}`);
  await connectToDatabase();
});
