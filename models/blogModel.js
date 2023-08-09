const mongoose=require('mongoose')

const BlogApiSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
    // image:    
    // {
    //   public_id: {
    //     type: String,
        
    // },
    // url:{
    //   type:String
    // }
//   }
},{timestamps:true})

const BlogModel=mongoose.model('blog',BlogApiSchema)
module.exports=BlogModel