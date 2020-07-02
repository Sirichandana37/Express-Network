const mongoose=require('mongoose');
const profileSchema=mongoose.Schema({
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
const Profile = module.exports = mongoose.model('Profile',profileSchema);

