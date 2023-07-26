import { useState } from "react";
import useRequest from "../../hooks/use-request"
import { useRouter } from "next/router"

export default function() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const {doRequest, errors} = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {email, password},
    onSuccess: () => router.push('/')
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="pw" className="form-label">
          Password
        </label>
        <input
          id="pw"
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  );
}
