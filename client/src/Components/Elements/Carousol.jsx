import React from "react";

const Carousol = (data) => {
  var ele = [];
  if (data.data[0].url != "") {
    ele[0] = (
      <div class="carousel-item active" key="0">
        <img
          src="https://github-production-user-asset-6210df.s3.amazonaws.com/89864614/239711589-b48e9bb9-f6f7-4c8e-a41e-d7929d56d666.png"
          class="d-block w-100"
          alt="..."
        />
      </div>
    );
  }
  for (var i = 1; i < data.data.length; i++) {
    ele[i] = (
      <div class="carousel-item" key={i}>
        <img
          src={data.data[i].url}
          class="d-block w-100"
          alt="..."
        />
      </div>
    );
  }
  return (
    <>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">{ele}</div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousol;
