
const isLoggedIn = () => {
    if(localStorage.getItem("email") && localStorage.getItem("name") && localStorage.getItem("token") && localStorage.getItem("_id")){
        return true;
    }else{
        localStorage.clear()
        sessionStorage.clear()
        return false;
    }
}

export default isLoggedIn;