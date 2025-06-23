import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  const role = localStorage.getItem("role");
  const userId = parseInt(localStorage.getItem("user_id"));

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/events")
        .then((res) => {
          const result = Array.isArray(res.data) ? res.data : [res.data];
          setData(result);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`, {
        data: {
          userId: localStorage.getItem("user_id"),
          role: localStorage.getItem("role"),
        },
      })
      .then(() => {
        setDeleted(true);
      })
      .catch((err) => console.log("Axios Error:", err));
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Events</h3>

        {/* Show Add Event button only if user or admin */}
        {(role === "user" || role === "admin") && (
          <Link className="btn btn-success" to="/create">
            Add Event
          </Link>
        )}
      </div>

      <div className="row">
        {data.map((event) => (
          <div className="col-md-4 mb-4" key={event.id}>
            <Card>
              <Card.Body>
                <Card.Title>{event.e_name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Location: {event.location}
                </Card.Subtitle>
                <Card.Text>Max Participants: {event.max_count}</Card.Text>

                {/* ✅ Show only for Admins and user who create the event */}
                {role === "admin" && (
                  <Card.Text>
                    <strong>Added By:</strong> {event.created_by}
                  </Card.Text>
                )}

                <div className="d-flex justify-content-between">
                  <Link
                    to={`/read/${event.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View
                  </Link>

                  {(role === "admin" ||
                    event.user_id ===
                      parseInt(localStorage.getItem("user_id"))) && (
                    <>
                      <Link
                        to={`/edit/${event.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(event.id)}
                      >
                        Delete
                      </Button>
                      
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
