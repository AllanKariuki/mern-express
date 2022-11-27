const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT 

connectDB()

const app = express()

//these are going to be used in the urls
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//the beginning-endpoints
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log('Server started on port ' + port))