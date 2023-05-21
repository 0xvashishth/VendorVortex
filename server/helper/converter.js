async function convertUserObjToRes(userObj){
    var obj = {};
    obj.name = userObj.name;
    obj.email = userObj.email;
    obj.isVendor = userObj.isVendor;
    obj._id = userObj._id;
    return obj;
}

module.exports = {
    convertUserObjToRes
}