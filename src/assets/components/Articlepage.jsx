import React, { useEffect, useState } from "react";
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleVotes,
  postCommentToArticle,
  deleteCommentById,
} from "../../api";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
const Articlepage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    if (article_id) {
      setLoading(true);
      Promise.all([
        getArticleById(article_id),
        getCommentsByArticleId(article_id),
      ])
        .then(([articleData, commentsData]) => {
          setArticle(articleData);
          setComments(commentsData);
          setLoading(false);
        })
        .catch((err) => {
          setError(err);
          setLoading(false);
        });
    }
  }, [article_id]);

  const handleUpvote = () => {
    patchArticleVotes(article_id, 1)
      .then((updatedArticle) => {
        setArticle(updatedArticle);
      })
      .catch((err) => {
        console.error("Error upvoting article:", err);
        setError(err);
      });
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    postCommentToArticle(article_id, "butter_bridge", commentBody)
      .then((newComment) => {
        setComments([...comments, newComment]);
        setCommentBody(""); // Reset the form
      })
      .catch((err) => {
        console.error("Error adding comment:", err);
        setError(err);
      });
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentById(commentId)
      .then(() => {
        setComments(
          comments.filter((comment) => comment.comment_id !== commentId)
        );
      })
      .catch((err) => {
        console.error("Error deleting comment:", err);
        setError(err);
      });
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
        Error fetching the article: {error.message}
      </Alert>
    );
  }

  return (
    <Container className="mt-4">
      {article && (
        <Card>
          <Card.Img
            variant="top"
            src={article.article_img_url}
            alt={article.title}
          />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>{article.body}</Card.Text>
            <Button onClick={handleUpvote}>Upvote</Button>
            <Card.Footer className="text-muted">
              <small>
                By {article.author} on{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      )}

      <h4>Comments</h4>
      <Form onSubmit={handleAddComment}>
        <Form.Group controlId="commentForm">
          <Form.Control
            type="text"
            placeholder="Add a comment"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Add Comment
        </Button>
      </Form>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment.comment_id} className="mt-3">
            <Card.Body>
              <Card.Text>{comment.body}</Card.Text>
              <Button
                variant="danger"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </Button>
              <small className="text-muted d-block">By {comment.author}</small>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </Container>
  );
};

export default Articlepage;
