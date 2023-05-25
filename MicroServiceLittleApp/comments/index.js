const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

const commentsByPostId = {
  id1: [{ id: "commentId1", content: "content1", status: "approved" }],
  id2: [{ id: "commentId2", content: "content2", status: "approved" }],
};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts/:id/comments", (req, res) => {
  const { id: postId } = req.params;
  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const { id: postId } = req.params;

  const comments = commentsByPostId[req.params.id] || [];

  const newComment = { id: commentId, content, status: "Pending Moderation" };
  comments.push(newComment);

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      postId,
      commentId,
      content,
      status: "Pending Moderation",
    },
  });

  res.status(201).send(newComment);
});

app.post("/events", async (req, res) => {
  const event = req.body;
  if (event.type === "CommentModerated") {
    const comments = commentsByPostId[event.data.postId];
    const comment = comments.find(c => c.id === event.data.commentId)
    comment.status = event.data.status;
    await axios.post("http://localhost:4005/events", {type: "CommentUpdated", data: comment})
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("Listen on 4001");
});
