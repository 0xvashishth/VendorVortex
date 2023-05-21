import React, { useState, useEffect } from "react";
import Community from "./ProfileElement/Community";
import Shop from "./Elements/Shops";
import { useParams } from "react-router-dom";
import { isVendor, isLoggedIn } from "../helper";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [community, setCommunity] = useState({});
  const [shop, setShop] = useState({});
  const [plan, setPlan] = useState({});
  const { id } = useParams();

  const getUserData = async () => {
    const toastId = toast.loading("Preparing Your Data.. 🧩");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resJson = await res.json();
      console.log("Data in profile : ", resJson);
      setUserData(resJson.user);
      toast.success(resJson.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleCommunityModal = (e) => {
    if (isLoggedIn() && isVendor()) {
      const { name, value } = e.target;
      setCommunity({ ...community, [name]: value });
    }
  };

  const handleShopModal = (e) => {
    if (isLoggedIn() && isVendor()) {
      const { name, value } = e.target;
      setShop({ ...shop, [name]: value });
    }
  };

  const handlePlanModal = (e) => {
    if (isLoggedIn() && isVendor()) {
      const { name, value } = e.target;
      setPlan({ ...plan, [name]: value });
    }
  };

  const handleCommunitySubmit = async () => {
    if (!isLoggedIn() || !isVendor()) {
      toast.error("You are not authorized for this action..🚀");
    }
    const toastId = toast.loading("Preparing Your Community's Data.. 🚀");
    try {
      const { vendorName, vendorDesc, vendorShopid } = community;
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/community`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jwttokenloginuser: localStorage.getItem("token"),
            name: vendorName,
            description: vendorDesc,
            shopId: vendorShopid,
          }),
        }
      );
      const data = await res.json();
      toast.success(data.message, {
        id: toastId,
      });
      getUserData();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };

  const handleShopSubmit = async () => {
    if (!isLoggedIn() || !isVendor()) {
      toast.error("You are not authorized for this action..🚀");
    }
    const toastId = toast.loading("Preparing your data for New Shop.. 🚀");
    try {
      const {
        shopname,
        shopDesc,
        shopAdd,
        shopCity,
        shopState,
        shopCountry,
        shopPinCode,
        shopContact,
      } = shop;
      console.log(shop);
      var token = localStorage.getItem("token");
      console.log(token);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/shop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: shopname,
          description: shopDesc,
          fullAddress: shopAdd,
          city: shopCity,
          state: shopState,
          country: shopCountry,
          pincode: shopPinCode,
          jwttokenloginuser: token,
        }),
      });
      const data = await res.json();
      toast.success(data.message, {
        id: toastId,
      });
      getUserData();
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
      console.log(error);
    }
  };

  const handlePlanSubmit = async () => {
    if (!isLoggedIn() || !isVendor()) {
      toast.error("You are not authorized for this action..🚀");
    }
    const toastId = toast.loading("Preparing your data for New Plan.. 🚀");
    try {
      const { planname, plandesc, planshopid } = plan;
      console.log("We are sending : ", plan);
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/plan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jwttokenloginuser: localStorage.getItem("token"),
          name: planname,
          description: plandesc,
          shopId: planshopid,
        }),
      });
      const data = await res.json();
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <>
      {isLoggedIn() && isVendor() ? (
        <>
          <div
            className="modal fade"
            id="createCommunityModal"
            tabIndex="-1"
            aria-labelledby="createCommunityModalLabel"
            aria-hidden="true"
            key="1"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="createCommunityModalLabel"
                  >
                    Create a community
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <fieldset>
                      <div className="form-group row">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            name="vendorName"
                            onChange={handleCommunityModal}
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleCommunityModal}
                            name="vendorDesc"
                            placeholder="Enter Description"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Shop Name
                        </label>
                        <div className="col-sm-10">
                          <select
                            className="form-select"
                            id="exampleSelect1"
                            onChange={handleCommunityModal}
                            name="vendorShopid"
                          >
                            {userData.shops &&
                              userData.shops.map((shop) => {
                                return (
                                  <>
                                    <option value={shop._id} name={shop._id}>
                                      {shop.name}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleCommunitySubmit}
                    >
                      Create Community
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="createShopModal"
            tabIndex="-1"
            aria-labelledby="createShopModalLabel"
            aria-hidden="true"
            key="2"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="createShopModalLabel">
                    Create Shop
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <fieldset>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopname"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopDesc"
                            placeholder="Enter Description"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopAdd"
                            placeholder="Enter Address"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          City
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopCity"
                            placeholder="Enter City"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          State
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopState"
                            placeholder="Enter State"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopCountry"
                            placeholder="Enter Country"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Pin Code
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handleShopModal}
                            name="shopPinCode"
                            placeholder="Enter Pin Code"
                          />
                        </div>
                      </div>
                      {/* Images are left for now */}
                    </fieldset>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleShopSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="createPlanModal"
            tabIndex="-1"
            aria-labelledby="createPlanModalLabel"
            aria-hidden="true"
            key="3"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="createPlanModalLabel">
                    Create Plan
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <fieldset>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handlePlanModal}
                            name="planname"
                            placeholder="Enter Name"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            id="staticEmail"
                            onChange={handlePlanModal}
                            name="plandesc"
                            placeholder="Enter Description"
                          />
                        </div>
                      </div>
                      <div className="form-group row mt-2">
                        <label
                          for="staticEmail"
                          className="col-sm-2 col-form-label"
                        >
                          Shop Name
                        </label>
                        <div className="col-sm-10">
                          <select
                            className="form-select"
                            id="exampleSelect1"
                            onChange={handlePlanModal}
                            name="planshopid"
                          >
                            {userData.shops &&
                              userData.shops.map((shop) => {
                                return (
                                  <>
                                    <option value={shop._id} name={shop._id}>
                                      {shop.name}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handlePlanSubmit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        " "
      )}
      {userData.name && (
        <>
          <div className="mt-2 container emp-profile">
            <div className="row">
              <div className="col-md-6">
                <h2>{userData.name} &nbsp; {userData.isVendor ? <span class="badge text-bg-primary">Vendor</span> : <span class="badge text-bg-primary">User</span>}</h2>
                <p>{userData.email}</p>
              </div>
              {isLoggedIn() && isVendor() ?
              <div className="col-md-6">
                <button
                  type="button"
                  className="btn btn-primary mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#createCommunityModal"
                >
                  Create Community
                </button>
                <button
                  type="button"
                  className="btn btn-info mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#createShopModal"
                >
                  Create Shop
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-toggle="modal"
                  data-bs-target="#createPlanModal"
                >
                  Create Plan
                </button>
              </div> : "" }
            </div>
          </div>
          {isVendor() ?
          <>
          <Community
            communities={userData.communities}
            getUserData={getUserData}
          />
          <Shop shops={userData.shops} />
            </>
            : ""}
          <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
        </>
      )}
    </>
  );
};

export default Profile;
