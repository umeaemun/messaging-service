import React from 'react'
import styled from "styled-components";
import logo from '../assets/logo.png'

const Welcome = ({currentUser}) => {
  return (
    <Container>
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>Please Select a chat to start Messaging.</h3>
    </Container>
  )
}

const Container = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  h1,h3 {
    color: black;
    padding: 1rem;
    
  }
  span {
    color: black;
  }
  `


export default Welcome