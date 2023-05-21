import React from 'react'

const Plan = ({ plans }) => {
    return (
        // create a talbe to display the plan data, using map method, it should have name, members count, description and a delete button
        <div className='container'>
            <h3>Current Plans 🎊</h3>
            <table className="table table-active table-bordered text-center">
                <thead>
                    <tr>
                        <th><h3>Name</h3></th>
                        <th><h3>Description</h3></th>
                    </tr>
                </thead>
                <tbody className='table-group-dividers'>
                    {
                        plans.map((plan, index) => {
                            return (
                                <tr key={index} className='table-active'>
                                    <td><a href={`/plan/${plan._id}`}>{plan.name}</a></td>
                                    <td>{plan.description}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default Plan;