import React, { useState, useEffect } from "react";
import $ from "jquery";
import axios from "../axios.js";
import toast, { Toaster } from "react-hot-toast";
// import Loader from "./Loader";
import {isLoggedIn} from "../helper.js"

const Signup = () => {
  const [user, setuser] = useState({});

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [name]: value });
    // console.log("user : ", user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Preparing Your SpaceShip 🚀');
    const { name, email, password, isVendor } = user;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            isVendor,
          }),
        }
      );
      const data = await res.json();
      if (res.status == 201) {
        toast.success(data.message, {
          id: toastId,
        });
        console.log(data.user); 
        localStorage.setItem("token", data.jwttokenloginuser);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("_id", data.user._id);
        localStorage.setItem("isVendor", data.user.isVendor);
        window.location.href = "/";
      }else{
        toast.error(data.message, {
          id: toastId,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
      console.log(error);
    }
  };

  useEffect(()=>{
    if(isLoggedIn()){
      window.location.href = "/";
    }
  })
  return (
    <div className="container row m-4">
    <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
      <div className="col-md-5">
        <img
          className="rounded mx-auto d-block img-fluid"
          src="https://github.com/j-imy/test_repo/assets/89864614/aa9b7f29-9fe3-449c-8b4f-f595377079b6"
        ></img>
      </div>
      <div className="col-md-7 mx-auto">
        <form className="m-3">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="exampleInputName"
              aria-describedby="nameHelp"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="accountType" className="form-label">
              Signup As:
            </label>
            <select
              id="accountType"
              name="isVendor"
              onChange={handleInput}
              className="form-control"
            >
              <option value="false" name="false" selected>
                User
              </option>
              <option value="true" name="true">
                Vendor
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
