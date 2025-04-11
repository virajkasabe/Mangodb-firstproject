const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const routes=require('./productroutes/productroutes')

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use('/product',routes)
const User=require('./Models/User')


mongoose.connect('mongodb+srv://virajkasabe:Madhu%40123@leadsoft.xptupne.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft').then(()=>
    console.log('Connected')

                                         

).catch((err)=>
    console.log(err)
)
server.post('/register',async(req,res)=>{
try{
    const {fullName,userName,Age,Password}=req.body
    const userExist=await User.findOne({userName})
    if(userExist){
        res.json({
            status: false,
             message: "User exist"
    
         })

    }
    const userobj=new User({fullName,userName,Age,Password})
    await userobj.save()
    res.json({
        status: true,
         message: "Added sucessfully"

     })
}catch(err){
     res.json({
        status: false,
         message: `Error: ${err}` 

     })
}


})
server.post('/login',async(req,res)=>{
    try{
        const {fullName,userName,Age,Password}=req.body
        const userExist=await User.findOne({userName})
        if(!userExist){
            res.json({
                status: false,
                 message: "User does not exist"
        
             })
             
        }
        if(Password!==userExist.Password){
            return res.json({
                status: false,
                 message: "wrong password"
        
             })
        }
        return res.json({
            status: true,
             message: "login successfully"
    
         })

    }catch(err){
         res.json({
            status: false,
             message: `Error: ${err}` 
    
         })
    }
    
    
    })
  


server.listen(8055, () => {
    console.log('Server started at port 8055');
});


