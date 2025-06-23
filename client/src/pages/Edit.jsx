import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function Edit() {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_event/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting:", data);

    axios
      .post(`/edit_event/${id}`, data)
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log("Axios Error:", err));
  }

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h3>User {id}</h3>
      <Link className="btn btn-success" to="/">
        Back
      </Link>

      {data && (
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">Event Name: </label>
            <input
              value={data.e_name}
              type="text"
              name="e_name"
              onChange={(e) => setData({ ...data, e_name: e.target.value })}
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="name">Location: </label>
            <input
              value={data.location}
              type="text"
              name="location"
              onChange={(e) => setData({ ...data, location: e.target.value })}
            />
          </div>

          <div className="form-group my-3">
            <label htmlFor="name">Max Count: </label>
            <input
              value={data.max_count}
              type="number"
              name="max_count"
              o
              onChange={(e) => setData({ ...data, max_count: e.target.value })}
            />
          </div>

          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Edit;
