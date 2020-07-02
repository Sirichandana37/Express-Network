const mongoose=require('mongoose');
const friendreqSchema=mongoose.Schema({
    id:{
        type:Number
    },
    
    name:{
        type:String,
        required:true
    },
    designation:{
type:String,
required:true
    },
    image:{
        type:String,
        required:true
            }

})
const Friendreq=module.exports=mongoose.model('Friendreq',friendreqSchema);