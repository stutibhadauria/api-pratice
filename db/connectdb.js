const mongoose=require('mongoose')

const connectdb=()=>{
    return mongoose.connect(process.env.DB_URL,{
        
    }).then((data)=>{
        console.log(`mongodb connected with server : ${data.connection.host}`);
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports=connectdb