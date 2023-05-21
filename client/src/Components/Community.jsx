import React from 'react'

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
        alert(resJson.messge);
        getUserData();
    }
    return (
        // create a talbe to display the community data, using map method, it should have name, members count, description and a delete button
        <div className='container mt-3'>
            <h3>Communities 🚀</h3>
            <table className="table table-active text-center">
                <thead>
                    <tr>
                        <th><h3>Name</h3></th>
                        <th><h3>Members Count</h3></th>
                        <th><h3>Description</h3></th>
                        <th><h3>Delete</h3></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        communities.map((community, index) => {
                            return (
                                <tr key={index} className='table-active'>
                                    <td><a href={`/community/${community._id}`}>{community.name}</a></td>
                                    <td>{community.memberCount}</td>
                                    <td>{community.description}</td>
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