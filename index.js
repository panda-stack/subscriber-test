const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());
const EventEmitter = require("events");

const ee = new EventEmitter();

app.post("/publish/:topic", function (req, res) {
  const topic = req.params.topic;
  const body = req.body;
  ee.emit(topic, body);
  res.send("successful!");
});

app.post("/subscribe/:topic", function (req, res) {
  const topic = req.params.topic;
  const url = req.body.url;
  ee.on(topic, async (data) => {
    await axios.post(url, data);
  });
  res.send({
    topic: topic,
    url: url,
  });
});

app.listen(process.env.PUBLISHER_SERVER_PORT, function () {
  console.log(
    `Publisher server listening on port ${process.env.PUBLISHER_SERVER_PORT}!`
  );
});
