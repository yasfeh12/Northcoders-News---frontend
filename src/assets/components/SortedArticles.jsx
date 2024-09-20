import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SortArticles = ({ fetchSortedArticles }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState(
    searchParams.get("sort_by") || "created_at"
  );
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleOrderChange = () => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  const handleApplySort = () => {
    setSearchParams({ sort_by: sortBy, order: order });
    fetchSortedArticles(sortBy, order);
  };

  return (
    <Form className="d-flex gap-2 align-items-center mb-3">
      <Form.Group controlId="sortArticles">
        <Form.Label>Sort by:</Form.Label>
        <Form.Select value={sortBy} onChange={handleSortChange}>
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
        </Form.Select>
      </Form.Group>

      <Button variant="secondary" onClick={handleOrderChange}>
        {order === "desc" ? "Descending" : "Ascending"}
      </Button>

      <Button variant="primary" onClick={handleApplySort}>
        Apply Sort
      </Button>
    </Form>
  );
};

export default SortArticles;
