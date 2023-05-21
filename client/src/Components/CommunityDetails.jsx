import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {isLoggedIn} from "../helper.js";
import axios from "../axios.js";
import toast, { Toaster } from "react-hot-toast";

const CommunityDetails = () => {
  const { id } = useParams("id");
  const [communityDetails, setCommunityDetails] = useState({
    shop: {},
    owner: {},
    members: []
  });
  const [enrollFlag, setenrollFlag] = useState(false);

  const isCurrentlyEnrolled = (arr) => {
    // var arr = communityDetails.members;
    console.log(arr)
    for(var i = 0; i<arr.length;i++){
        if(arr[i]._id.toString() == localStorage.getItem("_id")){
            console.log("Hello");
            setenrollFlag(true);
            return;
        }    
    }
    setenrollFlag(false)
  }

  const getCommunityDetails = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}api/community/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resJson = await res.json();
    console.log("Result from getCommunityDetails : ", resJson);
    isCurrentlyEnrolled(resJson.community.members);
    setCommunityDetails(resJson.community);

  };
  useEffect(() => {
    getCommunityDetails();
  }, []);

  async function enroll(){
    if(!isLoggedIn()){
        toast.loading('Login For Joining the Community 🚀');
    }
    const toastId = toast.loading('Preparing Your Data 🚀');
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/community/enroll`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jwttokenloginuser: localStorage.getItem("token"),
            communityId: communityDetails._id
          }),
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        toast.success(data.message, {
          id: toastId,
        });
        getCommunityDetails();
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
  }

  async function unenroll(){
    if(!isLoggedIn()){
        toast.loading('Login To Remove your self from the Community 🚀');
    }
    const toastId = toast.loading('Preparing Your Data 🚀');
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/community/unenroll`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jwttokenloginuser: localStorage.getItem("token"),
            communityId: communityDetails._id
          }),
        }
      );
      const data = await res.json();
      if (res.status == 200) {
        toast.success(data.message, {
          id: toastId,
        });
        getCommunityDetails();
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
  }

  return (
    communityDetails && (
      <>
       <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
        <div className="container pt-3">
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <div className="card-body">
                  <h1 className="card-title">
                    {communityDetails.name}{" "}
                    <span className="badge text-bg-primary">Community</span>
                  </h1>
                  <h4 className="card-text">{communityDetails.description}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container mt-3 mx-auto">
          <div className="col-sm-6 p-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{communityDetails.shop.name}</h5>
                <p className="card-text">
                  {communityDetails.shop.fullAddress},{" "}
                  {communityDetails.shop.city}, {communityDetails.shop.state},{" "}
                  {communityDetails.shop.country}
                  <br />({communityDetails.shop.pincode})
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 p-1">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Shop Owner 🤵🏻</h5>
                <p className="card-text">
                  <a href={``}>{communityDetails.owner.name}</a>
                  <br />
                  {communityDetails.owner.email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 mx-auto text-center">
            {isLoggedIn() ? <><button className="btn btn-info" onClick={unenroll}>UnEnroll</button> &nbsp; <button className="btn btn-info" onClick={enroll}>Enroll</button> </> : ""}
            
        </div>
        <div className="container">
          <div className="table table-active card-body">
            <h2>Members</h2>
            <table className="table table-active text-center table-bordered">
              <thead>
                <tr>
                  <th>
                    <h3>User Id</h3>
                  </th>
                  <th>
                    <h3>Stage</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                {communityDetails.members &&
                  communityDetails.members.map((member, index) => {
                    return (
                      <tr key={index} className="table-active">
                        <td>{member._id}</td>
                        <td>{member.stage}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  );
};

export default CommunityDetails;
