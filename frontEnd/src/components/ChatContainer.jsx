import React,{useEffect, useState,useRef} from 'react'
import styled from "styled-components";
import ChatInput from './ChatInput';
import {host } from "../utils/APIRoutes";
import {v4 as uuidv4} from 'uuid'

const ChatContainer = ({currentUser,currentChat,socket}) => {

    const [messages,setMessages] = useState([])
    const [arrivalMessage,setArrivalMessage] = useState(null)
    const scrollRef = useRef()

    useEffect(()=>{
        if(currentChat){
            getMsgs()
        }
    },[currentChat])

    const getMsgs = async()=>{

        const token = localStorage.getItem('user-token')

        const value = {
           
            from: currentUser._id,
            to: currentChat._id,
        }
        fetch(`${host}/getAllMessages`,{
            method: "post",
            body: JSON.stringify(value),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                token
            }   
          
          }).then(res=>res.json()).then(result=>{console.log(result)
           
                setMessages(result)
                console.log(result)
           
          
          }).catch(err=>console.log(err.message))
    

    }


  const handleSendMsg = async(msg)=>{

    const token = localStorage.getItem('user-token')

    const value = {
        message: msg,
        to: currentChat._id,
        from: currentUser._id,
    }
    fetch(`${host}/addMessage`,{
        method: "post",
        body: JSON.stringify(value),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            token
        }   
      
      }).then(res=>res.json()).then(result=>{console.log(result)
        
      }).catch(err=>console.log(err.message))

      socket.current.emit('send-msg',{
        to: currentChat._id,
        from: currentUser._id,
        message:msg,
      })

      const msgs = [...messages]
      msgs.push({fromSelf:true, message: msg});
      setMessages(msgs) 

  }

  useEffect(()=>{
    if(socket.current){
        socket.current.on('msg-recieve',(msg)=>{
            setArrivalMessage({fromSelf:false, message:msg})
        })
    }
  },[])

  useEffect(()=>{
    arrivalMessage && setMessages((prev)=>[...prev,arrivalMessage])
  },[arrivalMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  },[messages])


  return (
    <>
    {currentChat && (
         <Container>

         <div className="chat-header">
             <div className="user-details">
                         <div className="avatar">
                             {currentChat.initials}
                         </div>
                         <div className="username">
                             <h2>{currentChat.username}</h2>
                         </div>
             </div> 
         </div>

         <div className="chat-messages">
            {
                messages.map((message)=>{
                    return (
                        <div ref={scrollRef} key={uuidv4()}>
                          <div
                            className={`message ${
                              message.fromSelf ? "sended" : "recieved"
                            }`}
                          >
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                        </div>
                     </div>
                    )
                })
            }
         </div>
         
         <ChatInput handleSendMsg={handleSendMsg}/>

     </Container>
    )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  
  margin-left: 1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    background-color: #F5F5F5;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    background-color: white;
    margin-top: 1rem;
    margin-bottom: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #E5E4E2;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #C3F3F8;
      }
    }
  }
  .avatar {
    font-size: 16px;
    width: 3em;
    height: 3em;
    border-radius: 50%;
    background: #009578;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  
  }
  
  .avatar::after {
    content: attr(data-label);
    font-family: 'Readex Pro', sans-serif;
    color: #ffffff;
  
  }
`

export default ChatContainer  