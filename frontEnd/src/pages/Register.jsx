import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import logo from '../assets/logo.png'
import {host} from '../utils/APIRoutes'

const Register = () => {

    const navigate = useNavigate()

    const [values,setValues] = useState({
        username:'',
        email:'',
        password:''
    })


    useEffect(()=>{
      if(localStorage.getItem("user-token")){
        navigate('/')
      }
    },[])

const handleSubmit = (event)=>{

    event.preventDefault();

    var name_initials = ''
    const array = values.username.split(' ')
    array.forEach((val)=>{
      name_initials+= val.split('')[0]
    })

    const value = {
        username: values.username,
        email: values.email,
        password: values.password,
        initials: name_initials

    }

    fetch(`${host}/signup`,{
        method: "post",
        body: JSON.stringify(value),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }   
        
      
   }).then(res=>res.json()).then(result=>{console.log(result)
    if(result.status == 'ok')
    {
        navigate('/login')
    }
    else{
      //refresh this form and show error
    }
   
  }).catch(err=>console.log(err.message))
  
};

const handleChange = (event)=>{

    setValues({ ...values, [event.target.name]: event.target.value })
    
};


     
  return (
    <>
        <FormContainer>
            
            <div className='brand'>
                <img src={logo} alt=''/>
                <h1>Messaging App</h1>
            </div>

            <form onSubmit={(event)=>{handleSubmit(event)}}>
                <div className='brand'>
                   
                    <h1>Register</h1>
                </div>

                <input 
                type="text" 
                placeholder='Username' 
                name='username' 
                onChange={e=>{handleChange(e)}}
                />

                <input 
                type="email" 
                placeholder='Email' 
                name='email' 
                onChange={e=>{handleChange(e)}}
                />

                <input 
                type="password" 
                placeholder='Password' 
                name='password' 
                onChange={e=>{handleChange(e)}}
                />

                <button type='submit'>Create User</button>

                <span>Already have an account? <Link to='/login'>Log In</Link></span>
            </form>
        </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: white;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: black;
    text-transform: uppercase;
  }
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #ace5b4;
  border-radius: 2rem;
  padding: 3rem 5rem;
  margin: 2rem;
}
input {
  background-color: transparent;
  padding: 1rem;
  border: 0.1rem solid black;
  border-radius: 0.4rem;
  color: black;
  width: 100%;
  font-size: 1rem;
  &:focus {
    border: 0.1rem solid white;
    outline: none;
  }
}
button {
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #33810b;
  }
}
span {
  color: black;
  text-transform: uppercase;
  a {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }
}

`;


export default Register