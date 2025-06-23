import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";

function Edit() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`/get_event/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      axios
        .get("/users")
        .then((res) => setUsers(res.data))
        .catch((err) => console.error("Failed to load users", err));
    }
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    console.log("userId from localStorage:", userId);
    console.log("role from localStorage:", role);

    if (!userId || !role) {
      alert("User info missing. Please login again.");
      return; // stop submission if no user info
    }

    const payload = {
      ...data,
      userId, // from localStorage (string)
      role, // from localStorage
      created_by: role === "admin" ? data.created_by : userId,
    };

    axios
      .post(`/edit_event/${id}`, payload)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log("Axios Error:", err));
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title
                className="mb-4"
                style={{
                  backgroundColor: "#ffc107",
                  color: "black",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Edit Event (ID: {id})
              </Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEventName">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="e_name"
                    value={data.e_name || ""}
                    onChange={handleChange}
                    placeholder="Enter event name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={data.location || ""}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMaxCount">
                  <Form.Label>Max Count</Form.Label>
                  <Form.Control
                    type="number"
                    name="max_count"
                    value={data.max_count || ""}
                    onChange={handleChange}
                    placeholder="Enter max participant count"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCreatedBy">
                  <Form.Label>Added by</Form.Label>
                  {localStorage.getItem("role") === "admin" ? (
                    <Form.Select
                      name="created_by"
                      value={data.created_by || ""}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select User</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.username}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Control
                      type="text"
                      value={data.username || "Unknown user"} // 👈 show the username
                      readOnly
                    />
                  )}
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Link className="btn btn-secondary" to="/">
                    Cancel
                  </Link>
                  <Button variant="success" type="submit">
                    Save Changes
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Edit;
