const mongoose=require('mongoose');
const commentSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    user:{
        type:String,
        required:false
    },
    comment:{
        type:String,
        required:false
    },
  
})
const Comment = module.exports = mongoose.model('Comment',commentSchema);

