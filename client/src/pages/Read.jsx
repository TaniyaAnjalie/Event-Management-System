import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";

function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  const role = localStorage.getItem("role");

  useEffect(() => {
    axios
      .get(`/get_event/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title
                className="mb-4"
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                Event Details (ID: {id})
              </Card.Title>

              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>ID:</strong> {data.id}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Event Name:</strong> {data.e_name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Location:</strong> {data.location}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Max Count:</strong> {data.max_count}
                </ListGroup.Item>
                {role === "admin" && (
                  <ListGroup.Item>
                    <strong>Added by:</strong> {data.username || "Unknown"}
                  </ListGroup.Item>
                )}
              </ListGroup>
              <div className="mt-4 d-flex justify-content-end">
                {(role === "admin" ||
                    data.user_id ===
                      parseInt(localStorage.getItem("user_id"))) && (
                <Link to={`/edit/${data.id}`}>
                  <Button variant="warning" className="me-2">
                    Edit
                  </Button>
                </Link>
                      )}

                <Link to="/">
                  <Button variant="secondary">Back</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Read;
