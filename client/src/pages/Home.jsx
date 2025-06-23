import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/events")
        .then((res) => {
          console.log("Backend response:", res.data); // Debug here
          setData(res.data);
        })
        .catch((err) => console.log("Axios Error:", err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log("Axios Error:", err));
  }

  return (
    <div className="container-fluid bg-primary vh-100 vm-100">
      <h3>Events</h3>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-success" to="/create">
          Add Events
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event Name</th>
            <th>Location</th>
            <th>Max Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => {
            return (
              <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.e_name}</td>
                <td>{event.location}</td>
                <td>{event.max_count}</td>
                <td>
                  <Link
                    className="btn mx-2 btn-success"
                    to={`/read/${event.id}`}
                   >
                    Read
                  </Link>
                  <Link
                    className="btn mx-2 btn-success"
                    to={`/edit/${event.id}`}
                   >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="btn mx-2 btn-danger"
                   >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
