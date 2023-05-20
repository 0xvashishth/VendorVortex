import React, { useState } from 'react'

const Signup = () => {
    const [user, setuser] = useState({});

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser({ ...user, [name]: value });
        console.log("user : ", user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, isVendor } = user;
        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, isVendor
            })
        });
        const data = await res.json();
        alert(data.message);
        console.log(data);
    }
    return (
        <div className="container">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="exampleInputName"
                        aria-describedby="nameHelp"
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="accountType" className="form-label">
                        Signup As:
                    </label>
                    <select id="accountType" name="isVendor" onChange={handleInput} className="form-control">
                        <option value="false" name="false">User</option>
                        <option value="true" name="true">Vendor</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>

    )
}

export default Signup