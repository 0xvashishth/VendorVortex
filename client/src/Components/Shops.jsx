import React, { useState, useEffect } from 'react'


const Shops = () => {
    const [shops, setShops] = useState({});
    const getShops = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/shop/allshops`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resJson = await res.json();
        console.log(resJson);
        setShops(resJson.shops);
    }

    useEffect(() => {
        getShops();
    }, []);

    return (
        Object.keys(shops).length >= 1 && <>

            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Shops</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card-columns">
                            {/* Display the communities as card, communities will have only name and description */}
                            {shops.map((shop, index) => {

                                return (
                                    <div className="card mt-2" key={index}>
                                        <div className="card-body">
                                            <h5 className="card-title"><a href={`/shop/${shop._id}`}>{shop.name}</a></h5>
                                            <p className="card-text">{shop.description}</p>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Shops;