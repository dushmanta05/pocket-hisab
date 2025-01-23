const express = require("express");
const connectDB = require("./config/databseDb");
const userRoute = require("./routes/userRoute");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 8080;
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5175/",
    methods: ["GET", "PUT", "DELETE", "POST"],
  })
);
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`Backend running on ${port}`);
});
