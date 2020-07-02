const express =require('express');
// const Joi = require('joi');
const router =express.Router();
const Network =require('../models/network.model.js');

// networks=[
//     {id:1, name:"Task1", status:"InComplete" },
//     {id:2, name:"Task2", status:"InComplete" },
//     {id:3, name:"Task3", status:"InComplete" }
// ];


router.post('/', (req,res)=>{
  
    // const result=validateNetwork(req.body);
    //   if(result.error){
    //       return res.status(404).send(result.error.details[0].message)
    //   }
      let newFeed=new Network({
          id:req.body.id,
          image:req.body.image,
          description:req.body.description,
          likes:req.body.likes,
   
      });
      newFeed.save((err,result)=>{
          if(err) console.log(err);
          else res.status(200).send(result);
      })
        })

router.get('/',(req,res)=>{
Network.find((err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
})
})

router.get('/:id', (req,res)=>{
  Network.findById({_id:req.params.id},(err,result)=>{
    if(err) res.status(404).send(err);
    else res.status(200).send(result);
  })
})


router.delete('/:id',(req,res)=>{
    Network.findByIdAndDelete({_id:req.params.id},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    

router.put('/:id',(req,res)=>{
    Network.findOneAndUpdate({_id:req.params.id},{$set:{id:req.body.id,image:req.body.image,description:req.body.description,likes:req.body.likes,}},(err,result)=>{
        if(err) res.status(404).send(err);
        else res.status(200).send(result);
      });
    })
    
    

module.exports=router;