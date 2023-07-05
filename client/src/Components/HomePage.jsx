import React from "react";
import { Route, Routes, NavLink as Link } from "react-router-dom";
import { isLoggedIn } from "../helper.js";

const HomePage = () => {
  return (
    <>
      <div className="mx-auto mt-5 container">
        <div className="text-center">
          <h1>Welcome to VendorVortex 🚀</h1>
          <h4 className="text-muted">
            Empowering Local Vendors and Building a Thriving Community 👨🏻‍🤝‍👨🏻
          </h4>
          <div className="m-2  mt-3">
            {!isLoggedIn() ? (
              <Link className="btn btn-outline-info" to="/signup">
                Get Started 🎉
              </Link>
            ) : (
              <Link className="btn btn-outline-secondary me-2" to={`/profile/${localStorage.getItem("_id")}`}>
                Go To Your Profile
              </Link>
            )}
          </div>
        </div>
      </div>

      <div id="vision">
        <div
          id="carouselExampleCaptions"
          className="carousel slide "
          data-bs-ride="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://github.com/j-imy/test_repo/assets/89864614/b48e9bb9-f6f7-4c8e-a41e-d7929d56d666"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://github.com/j-imy/test_repo/assets/89864614/02f3317a-4b58-4d00-a93e-cd4a67a12536"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://github.com/j-imy/test_repo/assets/89864614/5f5c3984-9ce9-49d5-828c-243bcefaf128"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="row mx-auto container position-relative py-2 px-4 mt-5">
        <div className="mx-auto mb-3">
          <h1 className="text-center" id="services">
            💥 Our Services 💥
          </h1>
        </div>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shop Registration 🏃🏻‍♀️</h5>
              <p className="card-text text-muted">
                Vendors can register on the platform and can register their
                shops to showcase their offers and plans 🌿.
              </p>
              <a href="#" className="btn btn-outline-secondary">
                know more
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Shop Plans ☘</h5>
              <p className="card-text text-muted">
                Vendors can provide plans for their regular customers and
                provide them plans on their purchase levels 💭.
              </p>
              <a href="#" className="btn btn-outline-secondary">
                know more
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-3 mb-sm-0 h-100">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Build Community 👫</h5>
              <p className="card-text text-muted">
                Vendors can create community and customers can take benefits of
                different shop plans and they can stay updated of the vendors
                plans 👫.
              </p>
              <a href="#" className="btn btn-outline-secondary">
                know more
              </a>
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-3 mb-sm-0 h-100">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Customers 🛃</h5>
              <p className="card-text text-muted">
                Customers can access all the shops around him/her and take
                advantages by knowing the current plans and benefits of the
                community 💵.
              </p>
              <a href="#" className="btn btn-outline-secondary">
                know more
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
