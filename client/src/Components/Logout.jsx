import React from 'react'

const Logout = () => {
    const logout_call = () =>{
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    }
    logout_call();
    return (
        <div>Logout</div>
    )
}

export default Logout