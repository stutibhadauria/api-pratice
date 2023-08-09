const BlogModel=require('../models/blogModel')
class BlogController{
  static create=async(req,res)=>{
    try{
      const{title,description}=req.body
        const result=new BlogModel({
          title:title,
          description:description
        })
        await result.save()
        res.status(201).json({
          success:true,
          result
        })
    }
    catch(err){
        console.log(err);
    }
  }
  static display=async(req,res)=>{
    try{
       const data=await BlogModel.find();
       res.status(200).json({
        success:true,
        data
      })
    }catch(err){
      console.log(err);
    }
  }
  static view=async(req,res)=>{
    try{
        const data=await BlogModel.findById(req.params.id);
        res.status(200).json({
          success:true,
          data
        })    
      }catch(err){
      console.log(err);
    }
  }
  static update=async(req,res)=>{
    try{
      const{title,description}=req.body
         const data=await BlogModel.findByIdAndUpdate(req.params.id,{
          title:title,
          description:description
         })
         res.status(201).json({
          success:true,
          message:'update successfuly'
         })
    }catch(err){
      console.log(err);
    }
  }
  static delete=async(req,res)=>{
    try{
     const data=await BlogModel.findByIdAndDelete(req.params.id);
     res.status(200).json({
      success:true,
      message:'delete successfully'
     })
    }catch(err){
      console.log(err);
    }
  }
}

module.exports=BlogController