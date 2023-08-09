const ExpenseModel = require("../models/Expense");

class ExpenseController{
    static create=async(req,res)=>{
        try {
            const{title,amount,date}=req.body
            const result=new ExpenseModel({
                title:title,
                amount:amount,
                date:date
            })
            await result.save();
            res.status(201).json({
                success:true,
                message:"successfully created",
                result
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports=ExpenseController