
const isLoggedIn = () => {
    if(localStorage.getItem("email") && localStorage.getItem("name") && localStorage.getItem("token") && localStorage.getItem("_id")){
        return true;
    }else{
        localStorage.clear()
        sessionStorage.clear()
        return false;
    }
}

const isVendor = () => {
    if(localStorage.getItem("email") && localStorage.getItem("name") && localStorage.getItem("token") && localStorage.getItem("_id") && localStorage.getItem("isVendor") == "true"){
        return true;
    }else{
        localStorage.clear()
        sessionStorage.clear()
        return false;
    }
}

export{ isLoggedIn, isVendor};