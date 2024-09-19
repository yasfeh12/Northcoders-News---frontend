import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { patchCommentVotes } from "../../api";

const VoteButton = ({ article_id, comment_id, initialVotes }) => {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);

  const handleUpvote = () => {
    patchCommentVotes(article_id, comment_id, 1)
      .then(() => {
        setVotes((prevVotes) => prevVotes + 1);
      })
      .catch((err) => {
        setError("Error upvoting comment: " + err.message);
      });
  };

  return (
    <div>
      <p>Votes: {votes}</p>
      <Button variant="primary" onClick={handleUpvote}>
        Upvote
      </Button>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default VoteButton;
