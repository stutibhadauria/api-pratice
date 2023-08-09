const express=require('express')
const BlogController = require('../controller/BlogController');
const UserController = require('../controller/UserController');
const ExpenseController = require('../controller/ExpenseController');
const router=express.Router()

//blog controller
router.post('/create',BlogController.create);
router.get('/display',BlogController.display)
router.get('/view/:id',BlogController.view)
router.post('/update/:id',BlogController.update)
router.get('/delete/:id',BlogController.delete)

//usercontroller
router.post('/register',UserController.userRegister)
router.get('/login',UserController.verifylogin)

//expenseController
router.post('/createexpense',ExpenseController.create)

module.exports=router