import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const navigate = useNavigate();

  // Get user info from localStorage (you can store role and username on login)
  const role = localStorage.getItem("role");

  function handleLogout() {
    localStorage.clear(); // Or selectively remove tokens/info
    navigate("/signin");
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Event Management
        </Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {/* Only show Create/Edit links for admin */}
          {role === "admin" && (
            <>
              <Nav.Link as={Link} to="/create">
                Create Event
              </Nav.Link>
            </>
          )}
        </Nav>

        <Nav>
          {/* If user is logged in */}
          {role ? (
            <NavDropdown
              title={
                <>
                  <span className="me-2">👤</span>
                </>
              }
              id="user-nav-dropdown"
              align="end"
            >
              <NavDropdown.Item as="span" disabled>
                {role ? role.charAt(0).toUpperCase() + role.slice(1) : ""}
              </NavDropdown.Item>

              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            // If no user, show SignIn and SignUp links
            <>
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
              <Nav.Link as={Link} to="/signup">
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
