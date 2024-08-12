const jwt =require("jsonwebtoken");
require("dotenv").config();
exports.auth=(req,res,next) =>{
    try{
        // extract jwt token
        const token=req.body.token || req.cookies.token;
        if(!token){
            return res.status(401).json({
                success : false,
                message :"token missing "
            })
        }
        // verify the token with method in jwt
        try{

            const payload =jwt.verify(token,process.env.JWT_SECRET);
            req.user=payload;
        }
        catch(error){
                // decode krte hue fatt gya
                return res.status(401).json({
                    success : false,
                    message :"token invalid"
                })
        }
        next();
    }  
     catch(error){
        return res.status(401).json({
            success : false,
            message :"something went wrong while verifing"
        })
    }
}

exports.isStudent=(req,res,next) =>{
    try{
        if(req.user.role!=="Student"){
            return  res.status(401).json({
                success : false,
                message :"this is protected path for student"
            })
        }
        next();
        // sucess true ko humne callback function se sambhal rakha hai routes main hi
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message :"user role can not matched"
        })
    }
}

exports.isAdmin=(req,res,next) =>{
    try{
        if(req.user.role!=="Admin"){
            return  res.status(401).json({
                success : false,
                message :"this is protected path for admin"
            })
        }
        next();
        // sucess true ko humne callback function se sambhal rakha hai routes main hi
    }
    catch(error){
        return res.status(500).json({
            success : false,
            message :"user role can not matched"
        })
    }
}