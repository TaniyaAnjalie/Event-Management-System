import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [user, setUser] = useState({ username: '', password: '', role: 'user' });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('/signup', user)
      .then(res => navigate('/signin'))
      .catch(err => alert('Signup failed'));
  }

  return (
    <div className="container mt-5">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} className="form-control my-2" />
        <input type="password" placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} className="form-control my-2" />
        {/* <select className="form-control my-2" onChange={e => setUser({ ...user, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select> */}
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
export default SignUp;
