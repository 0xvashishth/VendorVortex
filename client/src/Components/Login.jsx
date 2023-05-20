import React, { useState } from 'react'

const Login = () => {
    const [user, setuser] = useState({});

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = user;
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        console.log("Token : ", data.jwttokenloginuser);
        alert(data.message);
        if (res.status == 201) {
            localStorage.setItem('token', data.jwttokenloginuser);
            window.location.href = "/";
        }
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