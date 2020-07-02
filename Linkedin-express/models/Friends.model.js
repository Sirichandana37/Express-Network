const mongoose=require('mongoose');
const friendSchema=mongoose.Schema({
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
const Friend=module.exports=mongoose.model('Friend',friendSchema);