const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image: {
        public_id: {
          type: String,
          
        },
        url: {
          type: String,
          
        },
      },
},{timestamps:true})

const UserModel=mongoose.model('Userapi',userSchema)
module.exports=UserModel