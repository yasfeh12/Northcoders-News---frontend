import { Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container className="d-flex gap-5 flex-row align-items-start justify-content-center ">
        <Link to="/" className="btn btn-dark btn-lg">
          news
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex gap-3 flex-row">
            <Link to="/" className="btn btn-dark ">
              News
            </Link>

            <Link to="/articles/:articles_id" className="btn btn-dark">
              Profile
            </Link>
            <Link to="/user" className="btn btn-primary">
              log in
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
