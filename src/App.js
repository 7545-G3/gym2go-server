import express from 'express'
import bodyParser from 'body-parser'
import init from './app/db'
import Logger from './app/utils/Logger'
import Router from './app/routes/Router'
import * as models from './app/models'
import ErrorHandler from './app/middlewares/ErrorHandler'
import path from 'path'

const app = express()

app.use(bodyParser.json())
app.use(require('express-validator')())
app.use(require('winston-request-logger').create(Logger))
app.use(require('cors')())

Router.initializeApp(app)
ErrorHandler.initGlobalHandler(app)

// Add promises that need to be completed before starting the server here
app.initialization = init()

export default app
