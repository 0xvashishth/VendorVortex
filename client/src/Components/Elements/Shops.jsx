import React from 'react'

const Shop = ({ shops }) => {
    
    return (
        // create a talbe to display the shop data, using map method, it should have name, members count, description and a delete button
        <div className='container'>
            <h3> Shops 🎊</h3>
            <table className="table table-active table-bordered text-center">
                <thead>
                    <tr>
                        <th><h3>Name</h3></th>
                        <th><h3>Description</h3></th>
                        <th><h3>City</h3></th>
                    </tr>
                </thead>
                <tbody className='table-group-dividers'>
                    {
                        shops.length > 0 ?
                        shops.map((shop, index) => {
                            console.log("Here")
                            return (
                                <tr key={index} className='table-active'>
                                    <td><a href={`/shop/${shop._id}`}>{shop.name}</a></td>
                                    <td>{shop.description}</td>
                                    <td>{shop.city}</td>
                                </tr>
                            )
                        }) : ""
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Shop;