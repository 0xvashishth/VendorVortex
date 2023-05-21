import React from "react";

const Carousol = (data) => {
  if(data.data.length == 0){
    return;
  }
  var ele = [];
  if (data.data[0].url != "") {
    ele[0] = (
      <div className="carousel-item active" key="0">
        <img
          src="https://github-production-user-asset-6210df.s3.amazonaws.com/89864614/239711589-b48e9bb9-f6f7-4c8e-a41e-d7929d56d666.png"
          className="d-block w-100"
          alt="..."
        />
      </div>
    );
  }
  for (var i = 1; i < data.data.length; i++) {
    ele[i] = (
      <div className="carousel-item" key={i}>
        <img
          src={data.data[i].url}
          className="d-block w-100"
          alt="..."
        />
      </div>
    );
  }
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">{ele}</div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousol;
