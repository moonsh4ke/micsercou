import { useState, useEffect, useRef } from "react";
import axios from "axios";

function CreateComment({ id, handleSubmit }) {
  const [content, setContent] = useState("");
  const textAreaRef = useRef(null);

  return (
    <>
      <h3>Create Comment</h3>
      <form
        style={{ display: "flex", flexDirection: "column", width: "150px" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(content, setContent, textAreaRef);
        }}
      >
        <textarea
          ref={textAreaRef}
          value={content}
          style={{ marginBottom: "10px", width: "250px" }}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function Post({ id, title, comments }) {
  const [commentSubmitStatus, setCommentSubmitStatus] = useState(null);
  const [commentsState, setCommentsState] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const commentRes = await axios.get(
        `http://localhost:4001/posts/${id}/comments`
      );
      setCommentsState(commentRes.data);
    };
    fetchComments();
  }, [commentSubmitStatus]);

  const handleCommentSubmit = async (content, setContent, textAreaRef) => {
    const data = { content };
    await axios
      .post(`http://localhost:4001/posts/${id}/comments`, data)
      .then(() =>
        setCommentSubmitStatus({
          status: "ok",
          message: `created comment: ${content}`,
        })
      );
    await setContent("");
    textAreaRef.current.focus();
  };

  return (
    <div
      style={{
        width: "300px",
        height: "auto",
        border: "solid rgba(23, 137, 255, 0.72) 1px",
        background: "rgba(72, 155, 244, 0.14)",
        margin: "5px",
        padding: "5px",
        flexBasis: "auto",
      }}
    >
      <h2>{title}</h2>
      <h4>id {id}</h4>
      {commentsState && (
        <>
          <h5>{commentsState.length} comments</h5>
          <ul>
            {commentsState.map((c) => (
              <li key={c.id}>{c.status === 'approved'? c.content: c.status}</li>
            ))}
          </ul>
          <hr />
          <CreateComment
            status={commentSubmitStatus}
            handleSubmit={handleCommentSubmit}
            id={id}
          />
        </>
      )}
    </div>
  );
}

export default function PostList({ submitStatus }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postRes = await axios.get("http://localhost:4002/posts");
      const postData = postRes.data;
      setPosts(Object.values(postData));
    };
    fetchPost();
  }, [submitStatus]);

  return (
    <>
      <h1>PostList</h1>
      <div id="postList" style={{ display: "flex", flexWrap: "wrap" }}>
        {posts && posts.map((p) => <Post {...p} key={p.id} />)}
      </div>
    </>
  );
}
