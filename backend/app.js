const express = require('express')
const errorMiddleware = require('./middlewares/error')
const app = express()

app.use(express.json())


//  import all routes
const products = require('./routes/product')

app.use('/api/v1', products)

// middlewares to handle errors 

app.use(errorMiddleware);

module.exports = app