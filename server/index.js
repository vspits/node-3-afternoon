

// // // REQUIRING ALL THE SHIZ // // // 

const express = require('express')
require('dotenv').config()
const {json} = require('body-parser')
const session = require('express-session')
const swag_controller = require('./controllers/swag_controller')
const checkForSession = require('./middlewares/checkForSession')

const app = express()


// // // MIDDLEWARE // // //

app.use(json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)


// // // ENDPOINTS // // //

app.get(`/api/swag`, swag_controller.read)
// app.post(`/api`)


// // // SERVER MAGIC // // //

const port = process.env.SERVER_PORT
app.listen(port, () => console.log(`${port}s werkin vry hard`))