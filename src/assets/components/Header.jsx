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
          Home
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex gap-3 flex-row">
            <Link to="/" className="btn btn-dark ">
              News
            </Link>
            <Link to="/cooking" className="btn btn-dark">
              Cooking Articles
            </Link>

            <Link to="/Football" className="btn btn-dark">
              Football Articles
            </Link>
            <Link to="/Coding" className="btn btn-dark">
              Coding Articles
            </Link>
          </Nav>
          <Link to="/Coding" className="btn btn-dark">
            log In
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
