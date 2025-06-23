import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/signin", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("user_id", res.data.user.id); // <--- add this line
        navigate("/");
      })
      .catch((err) => alert("Invalid login"));
  }

  return (
    <div className="container mt-5">
      <h3>Sign In</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="form-control my-2"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="form-control my-2"
        />
        <button className="btn btn-success">Login</button>
      </form>
    </div>
  );
}
export default SignIn;
