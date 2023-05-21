import React from "react";
import Carousol from "./Elements/Carousol";
import axios from "../axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {isLoggedIn} from "../helper.js";
import { useParams } from "react-router-dom";
import Community from "./Elements/Community"
import Plan from "./Elements/Plans"
import Rating from "./Elements/Ratings";

const Shop = () => {
  const [shopData, setshop] = useState({
    shop: {
      name: "Loading...",
      description: "Loading...",
      images: [
        {
          url: "",
        },
      ],
      ownerDetails: [
        {
          name: ""
        }
      ],
      communities: [],
      plans: [],
      ratings: [],
    },
  });
  const { id } = useParams();
  const [profileurl, setprofileurl] = useState("");
  const [comment, setcomment] = useState("");
  const [reviewCount, setreviewCount] = useState("");

  function postreview(e){
    e.preventDefault();
    if(!isLoggedIn()){
      toast.error("Login First To Post Comment 🚀");
      return;
    }
    const toastId = toast.loading("Preparing Data For Review.. 🚀");
    if(comment=="" || reviewCount==""){
      toast.error("Please fill review and select comment as both are required!", {
        id: toastId,
      });
      return;
    }
    try{
      axios.put(`/api/shop/rating`, {
        jwttokenloginuser: localStorage.getItem("token"),
        comment, rating: reviewCount, shopId: shopData.shop._id
      }).then((data)=>{
        toast.success(`${data.data.message} 💛`, {
          id: toastId,
        });
      }).catch((error)=>{
        console.log(error)
        toast.error(`${error.response.data.message} 💔`, {
          id: toastId,
        });
      })
    }
    catch(error){
      console.log(error);
      toast.error(`Try again, there is something wrong happened! 💔`, {
        id: toastId,
      });
    }
  }

  useEffect(() => {
    const toastId = toast.loading("Preparing Shop Details.. 🚀");
    function getShop() {
      axios
        .get(`/api/shop/${id}`)
        .then((data) => {
          console.log(data.data);
          toast.success(data.data.message, {
            id: toastId,
          });
          setshop(data.data);
          setprofileurl(`/profile/${data.data.shop.owner}`)
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            id: toastId,
          });
          console.log(error);
          window.location.href = "/"
        });
    }
    getShop();
  }, []);
  return (
    <div className="container">
      <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
      <div className="p-3">
        <h1 className="text-center">{shopData.shop.name}</h1>
        <div className="text-muted text-center">{shopData.shop.name}</div>
        <div>
          <Carousol data={shopData.shop.images} />
        </div>

        <div class="row">
          <div class="col-sm-6 p-1">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Address 🌍</h5>
                <p class="card-text">
                {shopData.shop.fullAddress}, {shopData.shop.city}, {shopData.shop.state}, {shopData.shop.country} 
                <br/>({shopData.shop.pincode})
                </p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 p-1">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Shop Owner 🤵🏻</h5>
                <p class="card-text">
                  <a href={profileurl}>{shopData.shop.ownerDetails[0].name}</a>
                  <br/>
                  {shopData.shop.ownerDetails[0].email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 container">
          <div>
            <h3>Provide Feedback Reveiew 🖋</h3>
          </div>
            <div className="col-md-7">
            <input className="form-control" type="text" name="comment" placeholder="Type a comment for this shop.." onChange={(e)=> setcomment(e.target.value)}/>
            </div>
           <div className="col-md-5">
            <select className="form-select" onChange={(e)=> setreviewCount(e.target.value)}>
                <option disabled selected>--Select Rating--</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
           </div>
           <div className="mx-auto text-center mt-2">
            <button className="p-1 mx-auto btn btn-outline-secondary" onClick={postreview}>Submit Review</button>
           </div>
        </div>

        <div className="mt-4">
        <Community communities={shopData.shop.communities}/>
        </div>

        <div className="mt-4">
        <Plan plans={shopData.shop.plans}/>
        </div>

        <div>
          <Rating ratings={shopData.shop.ratings} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
