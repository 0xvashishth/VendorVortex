import React, { useState, useEffect } from 'react'

const Community = () => {

    const [community, setCommunity] = useState({});
    const getCommunities = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/community/allcommunities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const resJson = await res.json();
        console.log(resJson);
        setCommunity(resJson.communities);
    }

    useEffect(() => {
        getCommunities();
    }, []);


    return (
        Object.keys(community).length >= 1 && <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Community</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="card-columns">
                            {/* Display the communities as card, communities will have only name and description */}
                            {community.map((community, index) => {
                                return (
                                    <div className="card mt-2" key={index}>
                                        <div className="card-body">
                                            <h5 className="card-title"><a href={`/community/${community._id}`}>{community.name}</a></h5>
                                            <p className="card-text">{community.description}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Community;