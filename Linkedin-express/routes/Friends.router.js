const express = require('express');
const router = express.Router();

const Friend = require('../models/Friends.model.js')

// function validateProduct(product) {
//     const schema = {
//         name: Joi.string().min(3).required()
//     };
//     return Joi.validate(product, schema);
// }

router.get('/', (req, res) => {
    Friend.find((err,result)=>{
        if(err)res.status(404).send(err);
else res.status(200).send(result);
    })
    // res.send(todos);
})

// router.get('/:id/:name',(req,res)=>{
//     res.send(req.params.id+" "+req.params.name);
// })
router.get('/:id', (req, res) => {
    Friend.findById({_id:req.params.id},(err,result)=>{
        if(err)res.status(404).send(err);
        else res.status(200).send(result);
    })
    

})
let item_count=0
router.post('/', async(req, res) => {
    // const result = validateProduct(req.body);
    // if (result.error) {
    //     return res.status(404).send(result.error.details[0].message)
    // }
    let friend=await Friend.findOne({name:req.body.name});
    if(friend)
    return res.status(400).send("User already registerd");
  
    
    let newTask = new Friend({
        id:Friend.length+1,
        name:req.body.name,
        designation:req.body.designation,
        image:req.body.image
       
       
    });
    newTask.save(( err,result) => {
        if (err) console.log(err);
        else {res.status(200).send(result);
        }
    })
})
    router.delete('/:id', (req, res) => {
        
        Friend.findByIdAndDelete({_id:req.params.id},(err,result)=>{
           if(err)res.status(404).send(err);
           else res.status(200).send(result);
       });

    })
    router.put('/:id', (req, res) => {

        Friend.findOneAndUpdate(
           {_id:req.params.id}
           ,{$set:{id:req.body.id,name:req.body.name,designation:req.body.designation,image:req.body.image}},(err,result)=>{
            if(err)res.status(404).send(err);
            else res.status(200).send(result);
           })

    
    })
    module.exports = router;
