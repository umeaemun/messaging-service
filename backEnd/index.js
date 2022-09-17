const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/userRouter')
const messagesRouter = require('./routes/messagesRouter')
const socket = require('socket.io')

const db = require('./config/mongoose')
const middleware = require('./middlewares/index')

require('dotenv').config();
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
    


//routes
app.use(userRouter)
app.use(messagesRouter)



const server = app.listen(process.env.PORT || 5000,(err)=>{
    if(err){
        console.log('error on port')
    }else{
        console.log('app running successfully on port', process.env.PORT)
    }
})

const io = socket(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.message);
      }
    });
  });