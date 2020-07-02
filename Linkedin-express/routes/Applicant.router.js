const express=require('express');
const validate=require('../models/Applicant.model');
const router=express.Router();
const {User}=require('../models/Applicant.model');

router.get('/',(req,res)=>{
    User.find((err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})
router.get('/:id',(req,res)=>{
    User.findById({_id:req.params.id},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
    })
})
router.post('/',async(req,res)=>{
    
        let newTask=new User({
        username:req.body.username,
        email:req.body.email,
        mobile:req.body.mobile,
        gender:req.body.gender,
        qualification:req.body.qualification,
        technicalskills:req.body.technicalskills,
        experience:req.body.experience,
        company:req.body.company,
        ctc:req.body.ctc
        });
        newTask.save((err,result)=>{
            if(err) console.log(err);
            else res.status(200).send(result);
        })
  })
router.delete('/:id',(req,res)=>{
    User.findByIdAndDelete({_id:req.params.id},(err,result)=>{
    if(err) console.log(err);
    else res.status(200).send(result);
    console.log("task deleted")
   })
})
router.put('/:id',(req,res)=>{
    User.findOneAndUpdate(
        {_id:req.params.id},
        {$set:{username:req.body.username,
            email:req.body.email, 
            mobile:req.body.mobile,
            gender:req.body.gender,
            qualification:req.body.qualification,
            technicalskills:req.body.technicalskills,
            experience:req.body.experience,
            company:req.body.company,
            ctc:req.body.ctc}},
        (err,result)=>{
            if(err) console.log(err);
            else res.status(200).send(result);
        })
})
module.exports=router;
