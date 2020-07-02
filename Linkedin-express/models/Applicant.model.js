const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = mongoose.Schema({
    username:{type:String},
    email:{type:String},
    mobile:{type:String},
    gender:{type:String},
    qualification:{type:String},
    technicalskills:{type:String},
    experience:{type:String},
    company:{type:String},
    ctc:{type:String}
});
function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        mobile:Joi.string().required(),
        gender:Joi.string().required(),
        qualification:Joi.string.required(),
        technicalskills:Joi.string.required(),
        experience:Joi.string.required(),
        company:Joi.string.required(),
        ctc:Joi.string.required(),
    };
    return Joi.validate(user,schema);
}
const User = mongoose.model("User", userSchema);
exports.validate = validateUser;
exports.User = User; 