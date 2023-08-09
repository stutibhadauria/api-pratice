const express=require('express')
const app=express()
const dotenv=require('dotenv')
const connectdb = require('./db/connectdb')
const web=require('./route/web')

app.use(express.json())

dotenv.config({
    path:'.env'
})

connectdb();
app.use('/api',web)

app.listen(process.env.PORT,()=>{
    console.log(`started at localhost ${process.env.PORT}`);
})