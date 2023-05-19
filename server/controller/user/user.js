const User = require("../../database/userSchema");

const updateUser = (req, res) => {
  const { name, email } = req.body;
  try {
    var userExist = User.updateMany({_id: req.userId}, {$set: {email, name}});
    if(userExist){
        return res.status(200).json({ message: "Profile updated successfully!" });
    }else{
        return res.status(401).json({ message: "Failed to update profile!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error!", error });
  }
};

const deleteUser = (req, res) => {
  try {
    
  } catch (error) {
    
  }

};

const getUserById = (req, res) => {
  const { id } = req.params;
  console.log("I got the user Id: ", id);
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
};
