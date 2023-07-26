import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body)
      onSuccess()
      return response.data
    } catch(axiosErr) {
      const errLst = axiosErr.response.data;
      setErrors(
        <div className="alert alert-danger mb-3">
          <ul>
            {errLst.map((err, i) => <li key={i}>{err.message}</li>)}
          </ul>
        </div>
      )
    }

  };

  return { doRequest, errors };
};
