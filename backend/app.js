const express = require('express');
const cors = require('cors');

const { connectToDatabase } = require('./config/database');
const authRouter = require('./src/routes/auth.routes');
const userRouter = require('./src/routes/user.routes');

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
app.get('/', async (req, res) => {
  res.status(200).json({ success: true, message: 'Welcome to Pocket Hisab.' });
});

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.listen(port, async () => {
  console.log(`Backend running on ${port}`);
  await connectToDatabase();
});
