import React from 'react'

const Community = ({ communities }) => {
    return (
        // create a talbe to display the community data, using map method, it should have name, members count, description and a delete button
        <div className='container'>
            <h3>Community 👫</h3>
            <table className="table table-active table-bordered text-center">
                <thead>
                    <tr>
                        <th><h3>Name</h3></th>
                        <th><h3>Description</h3></th>
                    </tr>
                </thead>
                <tbody className='table-group-dividers'>
                    {
                        communities.map((community, index) => {
                            return (
                                <tr key={index} className='table-active'>
                                    <td><a href={`/community/${community._id}`}>{community.name}</a></td>
                                    <td>{community.description}</td>
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