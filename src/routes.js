const express = require('express')
const devController = require('./controllers/DevController')

const routes = express.Router()

routes.post('/dev', devController.store)

module.exports = routes