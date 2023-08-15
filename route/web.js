const express=require('express')
const BlogController = require('../controller/BlogController');
const UserController = require('../controller/UserController');
const ExpenseController = require('../controller/ExpenseController');
const admin_auth = require('../middleware/auth');
const router=express.Router()

//blog controller
router.post('/create',BlogController.create);
router.get('/display',BlogController.display)
router.get('/view/:id',BlogController.view)
router.post('/update/:id',BlogController.update)
router.get('/delete/:id',BlogController.delete)

//usercontroller
router.post('/register',UserController.userRegister)
router.post('/login',UserController.verifylogin)
router.get('/logout',UserController.logout)
router.get('/getuserdetail',admin_auth,UserController.getuserdetail)
router.get('/getalluser',UserController.getalluser)
router.post('/changepassword',admin_auth,UserController.changepassword)
router.post('/updateprofile',admin_auth,UserController.updateprofile)

//expenseController
router.post('/createexpense',ExpenseController.create)

module.exports=router