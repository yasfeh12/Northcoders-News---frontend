import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
