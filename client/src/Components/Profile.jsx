import React, { useState } from 'react';

const Profile = () => {
    const [community, setCommunity] = useState({
        vendorEmail: "",
        vendorDesc: "",
        vendorShopid: ""
    });
    const [shop, setShop] = useState({
        shopname: "",
        shopDesc: "",
        shopAdd: "",
        shopCity: "",
        shopState: "",
        shopCountry: "",
        shopPinCode: "",
        shopContact: ""
    });

    const [plan, setPlan] = useState({
        planname: "",
        plandesc: "",
        planshopid: ""
    })
    const handleCommunityModal = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setCommunity({ ...community, [name]: value });
    }

    const handleShopModal = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setShop({ ...shop, [name]: value });
    }

    const handlePlanModal = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setPlan({ ...plan, [name]: value });
    }

    const handleCommunitySubmit = async () => {
        console.log(community);
        const { vendorEmail, vendorDesc, vendorShopid } = community;
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/community`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                vendorEmail, vendorDesc, vendorShopid
            })
        });
        const data = await res.json();
        console.log("Data from community", data);
    }

    const handleShopSubmit = async () => {
        console.log(shop);
        const { shopname, shopDesc, shopAdd, shopCity, shopState, shopCountry, shopPinCode, shopContact } = shop;
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/shop`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shopname, shopDesc, shopAdd, shopCity, shopState, shopCountry, shopPinCode, shopContact
            })
        });
        const data = await res.json();
        console.log("Data from shop", data);
    }

    const handlePlanSubmit = async () => {
        console.log(plan);
        const { planname, plandesc, planshopid } = plan;
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/plan`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                planname, plandesc, planshopid
            })
        });
        const data = await res.json();
        console.log("Data from plan", data);
    }
    return (
        <>
            {/* Community Modal  */}
            <div className="modal fade" id="createCommunityModal" tabIndex="-1" aria-labelledby="createCommunityModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createCommunityModalLabel">Create a community</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset>
                                    <div className="form-group row">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                        <div className="col-sm-10">
                                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="vendorEmail" onChange={handleCommunityModal} placeholder="Enter Email" />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleCommunityModal} name="vendorDesc" placeholder='Enter Description' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Shop ID</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleCommunityModal} name="vendorShopid" placeholder='Enter ShopId' />
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleCommunitySubmit}>Create Community</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* shop modal  */}
            <div className="modal fade" id="createShopModal" tabIndex="-1" aria-labelledby="createShopModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createShopModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopname" placeholder='Enter Name' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="vendorDesc" placeholder='Enter Description' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Address</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopAdd" placeholder='Enter Address' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">City</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopCity" placeholder='Enter City' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">State</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopState" placeholder='Enter State' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Country</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopCountry" placeholder='Enter Country' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Pin Code</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handleShopModal} name="shopPinCode" placeholder='Enter Pin Code' />
                                        </div>
                                    </div>
                                    {/* Images are left for now */}
                                </fieldset>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleShopSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Plan Modal */}
            <div className="modal fade" id="createPlanModal" tabIndex="-1" aria-labelledby="createPlanModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="createPlanModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <fieldset>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handlePlanModal} name="planname" placeholder='Enter Name' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">Description</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handlePlanModal} name="plandesc" placeholder='Enter Description' />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-2">
                                        <label for="staticEmail" className="col-sm-2 col-form-label">shopId</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" id="staticEmail" onChange={handlePlanModal} name="planshopid" placeholder='Enter shopId' />
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handlePlanSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2 container emp-profile">
                <div className="row">
                    <div className="col-md-6">
                        <h2>Manav Joshi</h2>
                        <p>manavjoshi154@gmail.com</p>
                        <p>9157441707</p>
                    </div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#createCommunityModal">Create Community</button>
                        <button type="button" className="btn btn-info mx-2" data-bs-toggle="modal" data-bs-target="#createShopModal">Create Shop</button>
                        <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#createPlanModal">Create Plan</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
