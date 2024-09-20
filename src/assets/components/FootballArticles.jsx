import React, { useEffect, useState } from "react";
import { getArticles } from "../../api";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
const username = "jessjelly";
const FootballArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticles()
      .then((data) => {
        const footballArticles = data.filter(
          (article) => article.topic === "football"
        );
        setArticles(footballArticles);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

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
    <Container className="mt-4">
      <h2>Football Articles</h2>
      {articles.length > 0 ? (
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
      ) : (
        <p>No football articles available.</p>
      )}
    </Container>
  );
};

export default FootballArticles;
