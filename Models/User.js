const mongoose=require('mongoose')
const UserSchema=mongoose.Schema({
fullName:{type:String, required:true},
userName:{type:String, required:true, Unique:true},
Age:{type:Number, required:true},
Password:{type:String, required:true},
})
module.exports=mongoose.model('User',UserSchema)
