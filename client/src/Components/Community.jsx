import React, { userParams } from 'react'
import { NavLink as Link, useParams } from 'react-router-dom';

const Community = ({ communities, getUserData }) => {
    console.log("props in community", communities);

    const handleDelete = async (id) => {
        console.log("id", id);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/community`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwttokenloginuser: localStorage.getItem('token'), communityId: id })
        });
        const resJson = await res.json();
        console.log("Result from delte : ", resJson);
        getUserData();
    }
    return (
        // create a talbe to display the community data, using map method, it should have name, members count, description and a delete button
        <div className='container'>
            <h1>Community</h1>
            <table className="table table-active">
                <thead>
                    <tr>
                        <th><h3>Name</h3></th>
                        <th><h3>Members Count</h3></th>
                        <th><h3>Description</h3></th>
                        <th><h3>View</h3></th>
                        <th><h3>Delete</h3></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        communities.map((community, index) => {
                            return (
                                <tr key={index} className='table-active'>
                                    <td>{community.name}</td>
                                    <td>{community.memberCount}</td>
                                    <td>{community.description}</td>
                                    <td><Link type="button" className="btn btn-light" to={`/viewCommunity/${community._id}`} >View</Link></td>
                                    <td><button type="button" className="btn btn-dark" onClick={() => { handleDelete(community._id) }}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Community;