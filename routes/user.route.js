const express= require("express");
const { UserModel } = require("../models/user.model");

const userRouter= express.Router();

const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt");


userRouter.get("/user", async(req, res)=>{
    try {
        const data= await UserModel.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.send("Unable to get user data")
    }
})

userRouter.post("/signup", async(req, res)=>{
    const data= req.body;
    try {
        bcrypt.hash(data.password, 3, async(err, hashed)=>{
            if(err){
                res.send("Unable to signup");
            }else{
                const newData= new UserModel({...data, password:hashed});
                await newData.save();
                res.send("Successfully Signed up");
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Unable to signup")
    }
})

userRouter.post("/signin", async(req, res)=>{
    const data= req.body;
    try {
        const user= await UserModel.find({email:data.email});
        if(user.length>0){
            bcrypt.compare(data.password, user[0].password, (err, noerr)=>{
                if(noerr){
                    const token= jwt.sign({userId:user[0]._id, email:user[0].email}, 'masaijob');
                    res.send({"msg" : "Signin Successful", "token" : token});
                }else{
                    res.send("Wrong Password");
                }
            })
        }else{
            res.send("No User Found");
        }
    } catch (error) {
        console.log(error);
        res.send("Unable to signin");
    }
})



module.exports= {
    userRouter
}