import React from 'react';

function Success() {
  return (
    <div className="container mt-5">
      <h1 className="alert alert-success">Thanks for your order!</h1>
      <p className="lead strong bold alert alert-warning">
        If you have any questions, please email{' '}
        <a href="mailto:orders@example.com">hikanshk@gmail.com</a>.
      </p>
    </div>
  );
}
export default Success;
