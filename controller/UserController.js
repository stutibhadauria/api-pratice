const UserModel=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

class UserController{
   static userRegister=async(req,res)=>{
    try {
        const{name,email,password,cpassword}=req.body
        const user=await UserModel.findOne({email:email})
        if(user){
            res.status(401).json({
                message:"email alread exist"
            })
        }
        else{
            if(name&& email&&password&&cpassword){
                if(password==cpassword){
                    try{
                        const hashpassword=await bcrypt.hash(password,10)
                        const result=new UserModel({
                            name:name,
                            email:email,
                            password:hashpassword
                        })
                        await result.save()
                        res.status(202).json({
                            success:true,
                            message:"successfully restration",
                            result
                        })
                    }catch(err){
                        console.log(err);
                    }
                }else{
                    res.status(401).json({
                        message:"password and confirm password are not same"
                    })
                }
            }else{
                res.status(401).json({
                    message:"all fields are required"
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
   }
   static verifylogin=async(req,res)=>{
    try {
        //  console.log(req.body)
        const { email, password } = req.body
        if (email && password) {
            const user = await UserModel.findOne({
                email: email
            })
            if (user != null) {
                const ismatched = await bcrypt.compare(password, user.password)
                if (ismatched) {
                    //token generates
                    const token = jwt.sign({ id: user._id }, 'stuti_software_engineers')
                    // console.log(token)
                    res.cookie('token', token)
                    res.status(201).json({
                        status:"success",
                        message:"login successfully with web token",
                        token:token,
                        user,
                     })
                } else {
                    res.status(401).json({
                       message:"email or password not matched"
                    })
                }
            } else {
                res.status(401).json({
                    message:"you are not registered user"
                 })
            }
        }
        else {
            res.status(401).json({
                message:"all field are required"
             })
        }
    } catch (err) {
       res.send(err)
    }
   }
}

module.exports=UserController