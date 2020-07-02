const mongoose=require('mongoose');
const Joi= require('joi');
const jobSchema=mongoose.Schema({
    job_position:{
        type:String
        
    },
    company_name:{
        type:String
        
    },
    job_description:{
        type:String
       
    },
    employment_type:{
        type:String
        
    },
    location:{
        type:String
        
    },
    qualification:{
        type:String
    },
    salary:{
        type:String
    },
    experience:{
        type:String
    },
    image:{
        type:String
    }
    
})
function validateJob(job){
    const schema = {
        job_position:Joi.string.required(),
        company_name:Joi.string().required(),
        job_description:Joi.string(),
        employment_type: Joi.string().required(),
        location:Joi.string().required(),
        qualification:Joi.string().required(),
        salary:Joi.string().required(),
        experience:Joi.string().required(),
        image:Joi.string().required()
    };

    return Joi.validate(job,schema);
}
const Job=module.exports=
mongoose.model('Job',jobSchema);
exports.validate = validateJob;
exports.Job=Job;