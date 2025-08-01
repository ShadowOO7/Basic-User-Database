//Controller manipulates the model
const User = require("../models/users");

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});
    //res.setHeader("X-MyName","Shekhar Nayak");//always add 'X' to custom headers
    return res.json(allDBUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);
    if(!user)return res.status(404).jason({error : "User Not Found"});
    return res.json(user || { message: "User not found" });
}

async function handleUpdateUserById(req,res) {
    await User.findByIdAndUpdate(req.params.id, {lastName : 'Changed'});
    return res.json({ status: "Successfully Changed" });
}

async function handleDeleteUserById(req,res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Successfully Deleted" });
}

async function handleCreateNewUser(req,res) {
    const body  = req.body;
    if(!body || 
        !body.first_name || 
        !body.last_name || 
        !body.email || 
        !body.gender || 
        !body.job_title
    ) {
        return res.status(400).json({msg : "All fields are required..."});
    }
    
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });
   return res.status(201).json({msg : "Success", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}