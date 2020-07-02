const express=require('express');
const validate=require('../models/Job.model');
const router=express.Router();
const Job=require('../models/Job.model');

router.get('/',(req,res)=>{
    Job.find((err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})
router.get('/:id',(req,res)=>{
    Job.findById({_id:req.params.id},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})
router.post('/',async(req,res)=>{
    const { error} = validate(req.body)
    if(error) 
       return res.status(400).send(error.details[0].message);
        let newTask=new Job({
        job_position:req.body.job_position,
        company_name:req.body.company_name,
        job_description:req.body.job_description,
        employment_type:req.body.employment_type,
        location:req.body.location,
        qualification:req.body.qualification,
        salary:req.body.salary,
        experience:req.body.experience,
        image:req.body.image
        });
        newTask.save((err,result)=>{
            if(err) console.log(err);
            else res.status(200).send(result);
        })
  })
router.delete('/:id',(req,res)=>{
    Job.findByIdAndDelete({_id:req.params.id},(err,result)=>{
    if(err) console.log(err);
    else res.status(200).send(result);
    console.log("task deleted")
   })
})
router.put('/:id',(req,res)=>{
    Job.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{job_position:req.body.job_position,
            company_name:req.body.company_name,
            job_description:req.body.job_description,
            employment_type:req.body.employment_type,
            location:req.body.location,
            qualification:req.body.qualification,
            salary:req.body.salary,
            experience:req.body.experience,
            image:req.body.image}},
        (err,result)=>{
            if(err) console.log(err);
            else res.status(200).send(result);
        })
})
module.exports=router;
