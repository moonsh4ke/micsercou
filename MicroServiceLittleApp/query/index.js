const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser')
const cors = require('cors')

async function handleEvent(event) {
  if (event.type === "PostCreated") {
    const post = event.data
    posts[post.id] = {id: post.id, title: post.title, comments: []}
    await axios.post("http://event-bus-srv:4005/events", {type: "QueryServiceUpdated"});
  }

  if (event.type === "CommentCreated") {
    const comment = event.data;
    posts[comment.postId].comments.push({id: comment.commentId, content: comment.content, status: comment.status})
    await axios.post("http://event-bus-srv:4005/events", {type: "QueryServiceUpdated"});
  }

  if (event.type === "CommentUpdate") {
    const comment = posts[event.data.postId].comments.find(c => c.id === event.data.commentId)
    comment.status = event.data.status;
    comment.content = event.data.content;

    await axios.post("http://event-bus-srv:4005/events", {type: "QueryServiceUpdated"});
  }
}

const posts = {
  test1: { id: "test1", title: "title1", comments: []},
  test2: { id: "test2", title: "title2", comments: []},
};

const app = express();

app.use(bodyParser.json())
app.use(cors());

app.get('/posts', (req, res) => {
  res.status(201).send(posts);
});

app.post('/events', async (req, res) => {
  const event = req.body;
  handleEvent(event)
  res.send({})
})

app.listen(4002, async () => {
  console.log('listening on port 4002')
  const eventsRes = await axios.get('http://event-bus-srv:4005/events')
  eventsRes.data.forEach(e => handleEvent(e));
});
