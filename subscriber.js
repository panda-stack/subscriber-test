const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

const subScribe = (endPoint, topic) => {
  axios
    .post(
      `${process.env.PUBLISHER_SERVER}:${process.env.PUBLISHER_SERVER_PORT}/subscribe/${topic}`,
      {
        url: `${process.env.SUBSCRIBER_SERVER}:${process.env.SUBSCRIBER_SERVER_PORT}/${endPoint}`,
      }
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

app.post("/test1", (req, res) => {
  const data = req.body;
  console.log("new post to test1------->", data);
});

app.post("/test2", (req, res) => {
  const data = req.body;
  console.log("new post to test2------->", data);
});

app.listen(9000, function () {
  console.log("subscriber server listening on port 9000!");
});

subScribe("test1", "topic1");
subScribe("test2", "topic2");
