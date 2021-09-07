const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoose = require('mongoose')
const {MONGOURI} = require('./config/keys')
const cors = require('cors')
const path = require('path')

app.enable('trust proxy')
app.use(cors())

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to MONGO!!")
})

mongoose.connection.on('error', (err) => {
    console.log("Error connecting..",err)
})

app.use(express.static('client/build'))
require('./models/user')
require('./models/post')

app.use(express.json())


mongoose.model("User")
mongoose.model("Post")
mongoose.set('useFindAndModify', false);


app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
  
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))



app.listen(PORT,  () => {
    console.log('Server is running on PORT', PORT)
})

// cKrB3izQMxwxy7Zt
// const customeMiddleware = (req, res, next) => {
//     console.log("Middleware running..")
//     next()
// }

// // app.use(customeMiddleware)

// app.get('/',(req,res)=>{
//     console.log("home")
//     res.send("Hello World this is node.js")
// })

// app.get('/about',customeMiddleware ,(req,res)=>{
//     console.log("about page")
//     res.send("About page")
// })