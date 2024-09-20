import React, { useEffect, useState } from "react";
import { getCommentsByArticleId } from "../../api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import AddCommentForm from "./CommentForm";
import VoteButton from "./VoteButton";

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article_id) {
      setLoading(true);

      getCommentsByArticleId(article_id)
        .then((commentsData) => {
          setComments(commentsData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [article_id]);

  // Function to add the new comment to the existing list
  const addNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        Error fetching the comments: {error.message}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      <h4 className="mt-4">Comments</h4>
      <AddCommentForm article_id={article_id} addNewComment={addNewComment} />
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.comment_id} className="mt-3">
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              <small className="text-muted d-block">By {comment.author}</small>
              <VoteButton
                comment_id={comment.comment_id}
                initialVotes={comment.votes}
              />
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </Container>
  );
};

export default CommentSection;
