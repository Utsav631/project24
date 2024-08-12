const mongoose =require('mongoose');
const UserSchema=new mongoose.Schema({
    name :{
        type : String ,
        required :true,
        trim : true,
        // this is refrence to the post model
    } ,
    email :{
            type : String,
            required : true,
            trin : true ,
    },
    password :{
        type : String,
        required : true
    },
    role :{
        type : String ,
        required :true,
        enum : ["admin","Student"],
    }

});
module.exports=mongoose.model("user",UserSchema);