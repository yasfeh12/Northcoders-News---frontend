import React, { useState } from "react";
import { postCommentToArticle } from "../../api";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const AddCommentForm = ({ article_id, addNewComment }) => {
  const [commentBody, setCommentBody] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddComment = (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (commentBody.trim() === "") {
      setError("Comment cannot be empty.");
      return;
    }

    console.log("Submitting comment to article:", article_id);

    setIsSubmitting(true);

    postCommentToArticle(article_id, "jessjelly", commentBody)
      .then((newComment) => {
        console.log("Comment successfully added:", newComment);
        addNewComment(newComment);
        setSuccessMessage("Comment added successfully!");
        setCommentBody("");
        setError(null);
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
        setError(
          "Error adding comment: " +
            (err.response ? err.response.data.msg : err.message)
        );
        setSuccessMessage(null);
      })
      .finally(() => {
        setIsSubmitting(false);
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
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding Comment..." : "Add Comment"}
        </Button>
      </Form>
    </div>
  );
};

export default AddCommentForm;
