import PostCreate from "./components/PostCreate";
import PostList from "./components/PostList";
import { useState } from "react";
import axios from "axios";

function App() {

  const [postSubmitStatus, setPostSubmitStatus] = useState(null);

  const handlePostSubmit = (title) => {
    const data = { title };
      axios.post("http://posts.com/posts/create", data).then(() => setPostSubmitStatus({status: "OK"}));
  };

  return (
    <>
      <PostCreate status={postSubmitStatus} handleSubmit={handlePostSubmit} />
      <hr />
      <PostList submitStatus={postSubmitStatus}/>
    </>
  );
}

export default App;
