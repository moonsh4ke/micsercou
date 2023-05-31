import { useState } from 'react'
export default function PostCreate({ status, handleSubmit}) {
  const [title, setTitle] = useState("");
  return (
    <>
      <h2>Create Post</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(title);
        }}
        style={{ display: "flex", flexDirection: "column", width: "150px" }}
      >
        <label style={{ marginBottom: "3px" }}>
          Title
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
