const express = require("express");
const app = express();

const db = require("./models");

db.sequelize
  .sync()
  .then(() => console.log("db연결성공"))
  .catch((e) => console.error(e));

const postRouter = require("./routes/post");

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/post", postRouter);

app.listen((port = 3065), () => {
  console.log(port);
});
