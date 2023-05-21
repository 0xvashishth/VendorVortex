import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CommunityDetails = () => {
    const { id } = useParams('id');
    const [communityDetails, setCommunityDetails] = useState({});

    const getCommunityDetails = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/community/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const resJson = await res.json();
        console.log("Result from getCommunityDetails : ", resJson);
        setCommunityDetails(resJson.community);
    }
    useEffect(() => {
        getCommunityDetails();
    }, []);
    return (
        communityDetails && <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h1 className="card-title">{communityDetails.name}</h1>
                                <h4 className="card-text">{communityDetails.description}</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container">
                <div className="table table-active card-body">
                    <h2>Members</h2>
                    <table className="table table-active">
                        <thead>
                            <tr>
                                <th><h3>Name</h3></th>
                                <th><h3>Stage</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                communityDetails.members && communityDetails.members.map((member, index) => {
                                    return (
                                        <tr key={index} className='table-active'>
                                            <td>{member.name}</td>
                                            <td>{member.stage}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CommunityDetails;