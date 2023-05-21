import React from "react";

const Rating = ({ ratings }) => {
  return (
    <div className="d-flex container row">
      <div className="">
        <h3>Ratings.. 🧐</h3>
      </div>
      {ratings.map((rating, index) => {
        return (
          <div className="toast col-6 show m-1" key={index} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">{rating.rating} ⭐</strong>
            By &nbsp;<a href={`/profile/rating.user`} className="col-3 text-truncate">{rating.user}</a> 👨🏻‍🚀
          </div>
          <div className="toast-body">
            
            {rating.comment}
          </div>
        </div>
        );
      })}
    </div>
  );
};

export default Rating;
