const express =require('express');
// const Joi = require('joi');
const router =express.Router();
const Profile =require('../models/profile.model.js');

// Profiles=[
//     {id:1, name:"Task1", status:"InComplete" },
//     {id:2, name:"Task2", status:"InComplete" },
//     {id:3, name:"Task3", status:"InComplete" }
// ];


router.post('/', (req,res)=>{
  
    // const result=validateProfile(req.body);
    //   if(result.error){
    //       return res.status(404).send(result.error.details[0].message)
    //   }
      let newPost=new Profile({
          id:req.body.id,
          image:req.body.image,
          description:req.body.description,
          likes:req.body.likes,
   
      });
      newPost.save((err,result)=>{
          if(err) console.log(err);
          else res.status(200).send(result);
      })
        })

router.get('/',(req,res)=>{
Profile.find((err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
})
})

router.get('/:id', (req,res)=>{
  Profile.findById({_id:req.params.id},(err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
  })
})


router.delete('/:id',(req,res)=>{
    Profile.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    

router.put('/:id',(req,res)=>{
    Profile.findOneAndUpdate({_id:req.params.id},{$set:{id:req.body.id,image:req.body.image,description:req.body.description,likes:req.body.likes,}},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    
    

module.exports=router;