const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./Routes/route.js')
app.use(bodyParser.json())
app.use('/', route)
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/post', (req, res) => {
    res.send(req.body)
})

//adding mongodb connection string 
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.jpqo2bq.mongodb.net/Appointment_booking', {
    useNewUrlParser: true,
})
.then(() => console.log("Mongo connected successfully"))
.catch(error => console.log(error))

//application is running on 8080 PORT
app.listen(8080)