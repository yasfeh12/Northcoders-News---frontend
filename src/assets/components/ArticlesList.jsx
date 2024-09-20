import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { Link, useSearchParams } from "react-router-dom";
import SortArticles from "./SortedArticles";

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  const fetchSortedArticles = (sortBy = "created_at", order = "desc") => {
    setLoading(true);
    getArticles(sortBy, order)
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    const sortBy = searchParams.get("sort_by") || "created_at";
    const order = searchParams.get("order") || "desc";
    fetchSortedArticles(sortBy, order);
  }, [searchParams]);

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
      <Alert variant="danger">Error fetching articles: {error.message}</Alert>
    );
  }

  return (
    <Container>
      <SortArticles fetchSortedArticles={fetchSortedArticles} />{" "}
      <Row className="gy-4">
        {articles.map((article) => (
          <Col key={article.article_id} md={4}>
            <Link
              to={`/articles/${article.article_id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={article.article_img_url}
                  alt={article.title}
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.body.substring(0, 100)}...</Card.Text>
                  <Card.Footer className="text-muted">
                    <small>
                      By {article.author} on{" "}
                      {new Date(article.created_at).toLocaleDateString()}
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ArticlesList;
