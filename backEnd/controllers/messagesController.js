const Messages = require('../models/messageSchema')


const addMessage = async(req,res)=>{
try {
    const{from,to,message} = req.body
    Messages.create({
        message: {text: message},
        users: [from,to],
        sender: from,

    },(err,message)=>{
        if(err){
            return res.json({status: 'error',error: 'message not added'})
        }

        return res.json({status: 'ok'})
    })
    
} catch (error) {
    
}
  
}


const getAllMessages = async(req,res)=>{
    try {
        const { from, to } = req.body;
    
        const messages = await Messages.find({
          users: {
            $all: [from, to],
          },
        }).sort({ updatedAt: 1 });
    
        const projectedMessages = messages.map((msg) => {
          return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
          };
        });
        res.json(projectedMessages);
      } catch (ex) {
     
      }
   
}



module.exports = {addMessage,getAllMessages}