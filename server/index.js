

// // // REQUIRING ALL THE SHIZ // // // 

const express = require('express')
require('dotenv').config()
const {json} = require('body-parser')
const session = require('express-session')
const swag_controller = require('./controllers/swag_controller')
const checkForSession = require('./middlewares/checkForSession')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')

const app = express()


// // // MIDDLEWARE // // //

app.use(json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))


// // // ENDPOINTS // // //

app.get(`/api/swag`, swag_controller.read)
app.post(`/api/login`, auth_controller.login)
app.post(`/api/register`, auth_controller.register)
app.post(`/api/signout`, auth_controller.signout)
app.get(`/api/user`, auth_controller.getUser)
app.post(`/api/cart`, cart_controller.add)
app.post(`/api/car/checkout`, cart_controller.checkout)
app.delete(`/api/cart`, cart_controller.delete)
app.get(`/api/search`, search_controller.search)

// // // SERVER MAGIC // // //

const port = process.env.SERVER_PORT
app.listen(port, () => console.log(`${port}s werkin vry hard`))