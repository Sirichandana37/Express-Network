const mongoose=require('mongoose');
const networkSchema=mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    likes:{
        type:Number,
        required:true
    }
})
const Network = module.exports = mongoose.model('Network',networkSchema);

