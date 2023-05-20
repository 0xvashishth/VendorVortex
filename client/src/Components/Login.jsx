import React, { useState } from 'react'

const Login = () => {
    const [user, setuser] = useState({});

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser({ ...user, [name]: value });
        console.log("user : ", user);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email } = user;
        const res = await fetch("/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email
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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </form>
        </div>

    )
}

export default Login