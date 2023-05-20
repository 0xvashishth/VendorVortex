import React from 'react';
import { Route, Routes, NavLink as Link } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import Logout from './Logout';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path="/"></Route>
                <Route
                    exact
                    path="/login"
                    element={<Login />}
                ></Route>
                <Route
                    exact
                    path="/signup"
                    element={<Signup />}
                ></Route>
                <Route
                    exact
                    path="/profile"
                    element={<Profile />}
                ></Route>
                <Route
                    exact
                    path="/logout"
                    element={<Logout />}
                ></Route>
            </Routes>
        </>
    )
}

export default Navbar;