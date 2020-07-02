const express =require('express');
// const Joi = require('joi');
const router =express.Router();
const Comment=require('../models/comment.model.js');

// Comments=[
//     {id:1, name:"Task1", status:"InComplete" },
//     {id:2, name:"Task2", status:"InComplete" },
//     {id:3, name:"Task3", status:"InComplete" }
// ];


router.post('/', (req,res)=>{
  
    // const result=validateComment(req.body);
    //   if(result.error){
    //       return res.status(404).send(result.error.details[0].message)
    //   }
      let newComment=new Comment({
          id:req.body.id,
          user:req.body.user,
          comment:req.body.comment,
       
   
      });
      newComment.save((err,result)=>{
          if(err) console.log(err);
          else res.status(200).send(result);
      })
        })

router.get('/',(req,res)=>{
Comment.find((err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
})
})

router.get('/:id', (req,res)=>{
  Comment.findById({_id:req.params.id},(err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
  })
})


router.delete('/:id',(req,res)=>{
    Comment.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    

router.put('/:id',(req,res)=>{
    Comment.findOneAndUpdate({_id:req.params.id},{$set:{id:req.body.id,user:req.body.user,comment:req.body.comment}},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    
    

module.exports=router;