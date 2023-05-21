import React from "react";
import Carousol from "./Elements/Carousol";
import axios from "../axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Shop = () => {
  const [shopData, setshop] = useState({shop: {
    name: "test",
    description: "test",
    images: [{
        url: ""
    }]
  }});
  useEffect(() => {
    console.log("geegeg")
    const toastId = toast.loading("Preparing Shop Details.. 🚀");
    function getShop() {
      axios
        .get("/api/shop/64699f538d5a8f992a85d406")
        .then((data) => {
          console.log(data.data);
          toast.success(data.data.message, {
            id: toastId,
          });
          setshop(data.data)
        })
        .catch((error) => {
          toast.success(error.message, {
            id: toastId,
          });
        });
    }
    getShop();
  }, []);
  return (
    <div className="container">
      <Toaster toastOptions={{ style: { fontSize: "14px" } }} />
      <div className="p-3">
        <h1 className="text-center">{shopData.shop.name}</h1>
        <div className="text-muted text-center">
        {shopData.shop.name}
        </div>
        <div>
          <Carousol data={shopData.shop.images} />
        </div>

        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Shop;
