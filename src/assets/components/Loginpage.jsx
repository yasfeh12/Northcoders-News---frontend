import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Loginpage = ({ user }) => {
  if (!user) {
    return (
      <Container className="text-center mt-4">
        <h2>You are not logged in.</h2>
        <p>Please log in to view your profile.</p>
        <Button href="/login" variant="primary">
          Log In
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="text-center">
        <Card.Img
          variant="top"
          src={user.avatar_url}
          alt={`${user.username}'s avatar`}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            margin: "20px auto",
          }}
        />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            Username: <strong>{user.username}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Loginpage;
