const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const event = req.body;
  if(event.type === 'CommentCreated') {
    const status = event.data.content.includes('orange')? 'rejected' : 'approved';
    await axios.post("http://event-bus-srv:4005/events", {type: "CommentModerated", data: {...event.data, status}});
    console.log({type: "CommentModerated", data: {...event.data, status}});
  }
  res.send({});
});

app.listen(4003, () => console.log("listening on port 4003"));
