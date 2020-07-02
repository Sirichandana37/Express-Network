const express = require('express');
const router = express.Router();

const Friendreq = require('../models/Friendreq.model.js')

// function validateProduct(product) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     return Joi.validate(product, schema);
// }

router.get('/', (req, res) => {
    Friendreq.find((err,result)=>{
        if(err)res.status(404).send(err);
else res.status(200).send(result);
    })
    // res.send(todos);
})

// router.get('/:id/:name',(req,res)=>{
//     res.send(req.params.id+" "+req.params.name);
// })
router.get('/:id', (req, res) => {
    Friendreq.findById({_id:req.params.id},(err,result)=>{
        if(err)res.status(404).send(err);
        else res.status(200).send(result);
    })
    

})

router.post('/', (req, res) => {
    // const result = validateProduct(req.body);
    // if (result.error) {
    //     return res.status(404).send(result.error.details[0].message)
    // }
    let newTask = new Friendreq({
        id:req.body.id,
        name:req.body.name,
        designation:req.body.designation,
        image:req.body.image
       
       
    });
    newTask.save((err, result) => {
        if (err) console.log(err);
        else res.status(200).send(result);
    })
})
    router.delete('/:id', (req, res) => {
        Friendreq.findByIdAndDelete({_id:req.params.id},(err,result)=>{
           if(err)res.status(404).send(err);
           else res.status(200).send(result);
       });

    })
    router.put('/:id', (req, res) => {
        Friendreq.findOneAndUpdate(
           {_id:req.params.id}
           ,{$set:{id:req.body.id,name:req.body.name,designation:req.body.designation,image:req.body.image}},(err,result)=>{
            if(err)res.status(404).send(err);
            else res.status(200).send(result);
           })

    
    })
    module.exports = router;
