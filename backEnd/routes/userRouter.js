const express = require('express')
const userController = require('../controllers/userController')
const middleware = require('../middlewares/index')

const route = express.Router()

//authorization
route.post('/signup',userController.signup)
route.post('/login',userController.login)
route.get('/allUsers/:id',userController.allUsers)

module.exports = route;