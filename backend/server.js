require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 5000;

const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chattymedb.zgbnv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  return res.send("connected");
});

app.use("/user", require("./routes/user"));

app.listen(PORT, () => {
  console.log(`connected on port ${PORT}`);
});
