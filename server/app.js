const express = require('express')
require('./db/mongoose')
const userRoutes = require('./routes/user')
const mailRoutes = require('./routes/mail')
var cors = require('cors')


const app = express()
const PORT = process.env.PORT


app.use(cors({credentials: true, origin: 'https://mailx.netlify.app', exposedHeaders: ['Cookie']})); 
   
app.use(express.json())  // To parse into JSON

app.use("/", userRoutes);
app.use("/", mailRoutes);

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})
