const express=require ('express');
const cors=require ('cors');
const bodyParser=require ('body-parser');
const socket=require('socket.io');
const app=express();
const mongoose=require ('mongoose');
const port=process.env.PORT || 5000
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended:false
    })
)

const mongoURL='mongodb://localhost:27017/userlogin'

mongoose.connect(mongoURL,{useNewUrlParser:true})
.then(()=>console.log("mongodb connected"))
.catch(err=>console.log(err))

const Users=require('./routes/Users');
const Friendreq=require('./routes/Friendreq.router');
const Friend=require('./routes/Friends.router');
const jobRouter=require('./routes/Job.router');
const applicantRouter=require('./routes/Applicant.router');
const networkRouter =require('./routes/network.router');
const commentRouter =require('./routes/comment.router.js');
const profileRouter =require('./routes/profile.router.js');
app.use('/users', Users);
app.use('/friendreq', Friendreq);
app.use('/friend', Friend);
app.use('/api/job',jobRouter);
app.use('/api/applicant',applicantRouter);
app.use('/api/newsfeed', networkRouter)
app.use('/api/comment', commentRouter)
app.use('/api/profile',profileRouter)

server=app.listen(port,()=>{
    console.log("Server is running on port" +port )
})
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })
});