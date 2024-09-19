import React, { useState } from "react";
import { postCommentToArticle } from "../../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

let username = "butter_bridge";

const AddCommentForm = ({ article_id }) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddComment = (event) => {
    event.preventDefault();
    if (commentBody.trim() === "") {
      setError("Comment cannot be empty.");
      return;
    }

    postCommentToArticle(article_id, username, commentBody)
      .then((newComment) => {
        setSuccessMessage("Comment added successfully!");
        setCommentBody("");
        setError(null);
      })
      .catch((err) => {
        setError("Error adding comment: " + err.message);
        setSuccessMessage(null);
      });
  };

  return (
    <div className="mt-4">
      <h4>Add a Comment</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <Form onSubmit={handleAddComment}>
        <Form.Group controlId="commentForm">
          <Form.Label>Your Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your comment here"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Add Comment
        </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;
