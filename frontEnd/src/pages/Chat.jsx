import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import {host } from "../utils/APIRoutes";
import logo from '../assets/logo.png'
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Logout from "../components/Logout";


const Chat = () => {

  const socket = useRef()

  const navigate = useNavigate()
  const [contacts,setContacts] = useState([]);
  const [currentUser,setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined);
  const [isLoaded,setIsLoaded] = useState(false);
 
      
  useEffect(()=>{
      CurrentUser()
  },[])

  const CurrentUser = async()=>{
      
    if(!localStorage.getItem("chat-user")){
      navigate('/login')
    }else{
      setCurrentUser(await JSON.parse(localStorage.getItem('chat-user')))
      setIsLoaded(true)
    } 
  }


  useEffect(()=>{

    if(currentUser){
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)
    }
  },[currentUser])



  useEffect(()=>{
    if(currentUser){
      const token = localStorage.getItem('user-token')


          fetch(`${host}/allUsers/${currentUser._id}`,{
            method: "get",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                token
            }   
          
          }).then(res=>res.json()).then(result=>{console.log(result)
            if(result.status == 'ok')
            {
                setContacts(result.users)
            }
          
          }).catch(err=>console.log(err.message))

    }
  },[currentUser])

  const handleChatChange = (chat)=>{
    setCurrentChat(chat)
  }

  return (
    <>
    <Container>
        <div className='brand'>
            <img src={logo} alt=''/>
            <h1>Messaging App</h1>
            <Logout/>
        </div>

        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser}/>  
            ) : ( 
            <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket}/>)
          }
          
        </div>  

    </Container>
      
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    } 
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

`;

export default Chat