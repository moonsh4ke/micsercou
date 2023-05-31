const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();

const events = [];

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event).catch((e) => console.log(e))
  axios.post('http://comments-clusterip-srv:4001/events', event).catch((e) => console.log(e))
  axios.post('http://query-clusterip-srv:4002/events', event).catch((e) => console.log(e))
  axios.post('http://moderation-clusterip-srv:4003/events', event).catch((e) => console.log(e))

  res.send({status: 'OK'})
})

app.get('/events', (req, res) => {
  res.send(events);
})

app.listen(4005, () => console.log("listening on port 4005"));
