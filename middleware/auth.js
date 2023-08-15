const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')


const admin_auth = async(req,res,next) =>{
    // console.log('hello auth')
    const {token} = req.cookies
    // console.log(token)
    if (!token) {
        res.status(401).json({'status':"failed",'message':"unauthorized user, no token"})
       
    } else {
        const verify = jwt.verify(token,'stuti_software_engineers')
        // console.log(verify)
        const user = await UserModel.findById(verify.ID)
            // console.log(user)
            req.user = user
        next()
    }
}

module.exports = admin_auth