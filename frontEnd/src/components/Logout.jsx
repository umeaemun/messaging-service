import React from 'react'
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const Logout = () => {
    const navigate = useNavigate()

    const handleClick=()=>{
        localStorage.clear();
        navigate('/login')
    }
  return (
    <div>
      <Button onClick={()=>{handleClick()}}>LogOut</Button>
    </div>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  margin-left: 4rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`

export default Logout
