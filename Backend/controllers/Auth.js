const bcrypt=require("bcrypt");
const User=require("../models/user");
const jwt=require("jsonwebtoken");
require("dotenv").config();
// business logic
exports.signup =async (req,res)=>{
        try{
              
                const {name,role,email,password}=req.body; 
                // check if user is already exits
                const existingUser = await User.findOne({email});
                if(existingUser){
                    // phle se exist
                   return res.status(400).json(
                        {
                            success :false,
                            message :"user already exist"
                        }
                    ); 
                }
              //now secure the password by bcrypt
              let hashedPassword
              try{
                   hashedPassword= await bcrypt.hash(password,10);
              }
              catch(err){
                res.status(500).json(
                    {
                        success :false,
                        data : "unable to hash the password",
                        message : err.message
                    }
                )
              }
              // create user
              const user =await User.create({
                name,email,password : hashedPassword,role
              })
              return res.status(200).json(
                {
                    success :true,
                    message : "succesfully enter the entry in db",
                    
                }
            )
        }
        catch(error){
            console.error(error);
            res.status(500).json(
                {
                    success :false,
                    data : "user unable to register",
                    message : error.message
                }
            )
        }
}

exports.login= async (req,res) =>{
    try{
        //fectch data
            const {email , password}=req.body;
           

            // validation
            if(!email || !password) {
                return res.status(400).json(
                    {
                    success : false,
                    message :"please fill the detail properly" 
                });
            }
            const user=await User.findOne({email});
            if(!user){
                return res.status(401).json(
                    {
                    success : false,
                    message :"user is not registered" 
                });
            }
            const payload={
                email : user.email,
                id : user._id,
                role : user.role,
            }
            // verify password and generate a jwt  token
            if(await bcrypt.compare(password,user.password)){
                    // token create
                    let token =jwt.sign(payload,process.env.JWT_SECRET,
                        {
                            expiresIn :"23h"
                        });
                        user.token=token;
                        await user.save();
                        user.password=undefined;
                    const options={
                            expiresIn : new Date(Date.now() +2*24*60*60*1000),
                            httpOnly : true,
                    }
                    res.cookie("token",token,options).status(200).json({
                        success :true,
                        token,user,
                        message :"logged in succesfully"
                    })
            }
            else{
                //password not matched
                return res.status(403).json(
                    {
                    success : false,
                    message :"password not matched" 
                });
            }
    }
    catch(error){
        console.error(error);
            res.status(500).json(
                {
                    success :false,
                    data : "user unable to register",
                    message : error.message + " " + process.env.JWT_SECRET 
                }
            )
        }
}