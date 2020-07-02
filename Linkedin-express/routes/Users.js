const express=require("express")
const users=express.Router()
const cors=require("cors")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const User=require("../models/User")
users.use(cors())

process.env.SECRET_KEY='secret'
users.post('/register',(req,res)=>{
    const today=new Date()
    const userData={
        id:req.body.id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        password:req.body.password,
        created:today
    }
    User.findOne({
        email:req.body.email
    })
   .then(user=>{
    if(!user){
        bcrypt.hash(req.body.password, 10 ,(err,hash) =>{
            userData.password=hash
            User.create(userData)
            .then(user=>{
                res.json({status:user.email+'registered'})
            })
            .catch(err=>{
                res.send('error:' + err)
            })
        })

    }else{
        res.json({error: 'User already exist'})
    }
})
.catch(err=>{
    res.send('error:' +err)
})
})
users.post('/login',(req,res)=>{
    User.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
            if(bcrypt.compareSync(req.body.password,user.password)){
                const payload={
                    _id:user._id,
                    id:req.body.id,
                    first_name:user.first_name,
                    last_name:user.last_name,
                    email:user.email

                }
                let token=jwt.sign(payload,process.env.SECRET_KEY,{
                    expiresIn:1440
                })
                res.send(token)
            }
            else{
                res.json({error: "User does not exist"})
            }

        }
        else{
            res.json({error: "User does not exist"})
        }
    })
    .catch(err=>{
        res.send('error: ' +err)
    })
})

users.get('/profile',(req,res)=>{
    
    var decoded=jwt.verify(req.headers['authorisation'],process.env.SECRET_KEY)

    User.findOne({
        _id:decoded._id

    })
    .then(user=>{
        if(user){
            res.json(user)
        }
        else{
            res.send("User does Not exist")
        }
    })
    .catch(err=>{
        res.send('error:'+err)
    })
})

users.get('/profile/:id',(req,res)=>{
    User.findById({_id:req.params.id},(err,result)=>{
        if(err)res.status(404).send(err);
        else res.status(200).send(result);
    })   
 
})
users.get('/', (req, res) => {
    User.find((err,result)=>{
        if(err)res.status(400).send(err);
else res.status(200).send(result);
    })
    // res.send(todos);
})
users.get('/:id', (req, res) => {
    User.findById({_id:req.params.id},(err,result)=>{
        if(err)res.status(404).send(err);
        else res.status(200).send(result);
    })
    

})
users.put('/profile/:id', (req, res) => {
    User.findOneAndUpdate(
        {_id:req.params.id}
        ,{$set:{id:req.body.id,first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email}}
        ,(err,result)=>{
         if(err)res.status(404).send(err);
         else res.status(200).send(result);
        })

 
 })
module.exports=users