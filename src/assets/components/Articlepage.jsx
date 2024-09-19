import React, { useEffect, useState } from "react";
import CommentSection from "./CommentSection";
import { getArticleById } from "../../api";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

let username = "butter_bridge";
const Articlepage = () => {
  const { articles_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(articles_id)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [articles_id]);

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
      <p className="text-danger">Error fetching the article: {error.message}</p>
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
            <Card.Footer className="text-muted">
              <small>
                By {article.author} on{" "}
                {new Date(article.created_at).toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card.Body>
        </Card>
      )}
      <CommentSection article_id={articles_id} />
    </Container>
  );
};

export default Articlepage;
