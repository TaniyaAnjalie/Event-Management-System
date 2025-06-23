import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function Create() {
  const [values, setValues] = useState({
    e_name: "",
    location: "",
    max_count: "",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("Please login again. User ID missing.");
      return;
    }

    const payload = {
      ...values,
      user_id: userId,
    };

    console.log("Submitting:", payload);

    axios
      .post("/add_event", payload)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Axios Error:", err);
        alert("Something went wrong while adding the event.");
      });
  }

  return (
    <Container fluid className="vh-100 bg-primary text-white py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4">
            <Card.Body>
              <Card.Title className="mb-4 text-center">
                Add New Event
              </Card.Title>

              <div className="d-flex justify-content-end mb-3">
                <Link to="/" className="btn btn-success">
                  Back to Home
                </Link>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter event name"
                    value={values.e_name}
                    onChange={(e) =>
                      setValues({ ...values, e_name: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={values.location}
                    onChange={(e) =>
                      setValues({ ...values, location: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Max Count</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter max participant count"
                    value={values.max_count}
                    onChange={(e) =>
                      setValues({ ...values, max_count: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Save Event
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

export default Create;
