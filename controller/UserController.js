const UserModel=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const cloudinary=require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dnroacutk', 
    api_key: '956193383899983', 
    api_secret: 'fiAOrevYJW_D-HW7sWgAcNIwMNs',
    // secure: true
  });

class UserController{
   static userRegister=async(req,res)=>{
    const file=req.files.image
    const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
        folder:'blogs_image'
    })
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
                            password:hashpassword,
                            image:{
                                public_id: myimage.public_id,
                                url: myimage.secure_url 
                            }
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
   static logout=async(req,res)=>{
    try{
        res.clearCookie("token");
        res.send('logout successfully')
    }catch(err){
        console.log(err);
    }
   }
   static getuserdetail = async (req, res) => {
    try {
        //console.log(req.user);
        const user = await UserModel.findById(req.user.id);

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
      }
    }
   static getalluser=async(req,res)=>{
    try{
        const getalluser = await UserModel.find();
            res.status(200).json({
                success: true,
                getalluser,
            })
    }catch(err){
        console.log(err);
    }
   }
   static changepassword=async(req,res)=>{
    try{
        const { name, email, id, image } = req.user
            // console.log(req.body)
            const { oldpassword, newpassword, cpassword } = req.body
            if (oldpassword && newpassword && cpassword) {
                const user = await UserModel.findById(id)
                const ismatch = await bcrypt.compare(oldpassword, user.password)
                if (!ismatch) {
                    
                    res.status(400)
                .json({ status: "Failed", message: "Old Password is incorrect" });
                }
                else {
                    if (newpassword !== cpassword) {
                        
                        res.status(400)
                        .json({ status: "Failed", message: "Password and confirm password is not matched" });
                    }
                    else {
                        const newHashpassword = await bcrypt.hash(newpassword, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            $set: { password: newHashpassword }

                        })
                       
                        res.status(201)
                        .json({ status: "Success", message: "Password Change successfully" });
                    }
                }

            }
            else {
                res.status(400)
                .json({ status: "Failed", message: "All field are required" });

            }
    }catch(err){
        console.log(err);
    }
   }
   static updateprofile=async(req,res)=>{
    try{
          //console.log(req.files.image)
          if (req.files) {
            const user = await UserModel.findById(req.user.id);
            const image_id = user.image.public_id;
            await cloudinary.uploader.destroy(image_id);

            const file = req.files.image;
            const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "studentimage",

            });
            var data = {
                name: req.body.name,
                email: req.body.email,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url,
                },
            };
        } else {
            var data = {
                name: req.body.name,
                email: req.body.email,

            }
        }
        const update_profile = await UserModel.findByIdAndUpdate(req.user.id, data)
        res.status(201)
        .json({ status: "Success", message: "Profile Update successfully" });
    }catch(err){
        console.log(err);
    }
   }
   static sendEmail = async (name, email) => {
    // console.log("email sending")
    //consollog("propertyName")
    // console.log(email)

    //connenct with the smtp server

    let transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,

        auth: {
            user: "stutibhadauria28@gmail.com",
            pass: "moawpjgxlndmurhx",
        },
    });
    let info = await transporter.sendMail({
        from: '"stutibhadauria28@gmail.com" <stutibhadauria28@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Create course Registration Succesfully", // Subject line
        text: "hello", // plain text body
        html: `<b>${name}</b> Registration is successful! please login.. `, // html body
    });
    //console.log("Messge sent: %s", info.messageId);
    };
}

module.exports=UserController