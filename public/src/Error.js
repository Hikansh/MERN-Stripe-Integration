import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div>
      <div className="container mt-5">
        <h1 className="alert alert-danger">Your Payement Got Cancelled !</h1>
        <Link to="/" className="btn btn-dark">
          Go Back
        </Link>
      </div>
    </div>
  );
}
