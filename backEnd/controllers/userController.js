const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || '494898./yu!$^63df!vcxfv3278dhgdjsbv3i823'


//SignUp
const signup = async (req,res)=>{

const {password : orignalPassword} = req.body

if(orignalPassword.length<5){
    return res.json({
        status:'error',
        error: 'Password should be atleast 5 characters'
    })}

const password = await bcrypt.hash(orignalPassword,10)

await User.create({
        username: req.body.username,
        email: req.body.email,
        password: password,
        initials: req.body.initials
    },
    (err,user)=>{
        if(err){
            console.log('error in signup')
            return res.json({status: 'error',error: 'error in signup'})
        }
       
       return res.json({status: 'ok', user})
    })
}



//login
const login = async(req,res)=>{

    const {email,password} = req.body
    
    const user = await User.findOne({email}).lean()

    if(!user){
        
        return res.json({status:"error", error : 'Invalid username/password'})
        
    }

    if(await bcrypt.compare(password,user.password)){

        const token = await jwt.sign({
            id : user._id
        },
        JWT_SECRET
        )
        return res.json({status:"ok", token, user})
    }

    return res.json({status:"error", error : 'Invalid username/password'})

}


const allUsers = async(req,res)=>{
    
    const users = await User.find({_id:{$ne: req.params.id}}).select([
        'username',
        'email',
        'initials',
        '_id'
    ]);

        return res.json({status:"ok", users})
    
   
}



module.exports = {signup,login,allUsers}