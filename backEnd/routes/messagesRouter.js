const express = require('express')
const messagesController = require('../controllers/messagesController')
const middleware = require('../middlewares/index')

const route = express.Router()

//authorization
route.post('/addMessage',messagesController.addMessage)
route.post('/getAllMessages',messagesController.getAllMessages)

module.exports = route;