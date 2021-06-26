const express = require('express')
require('./db/mongoose')
const userRoutes = require('./routes/user')

const app = express()
const PORT = 3000

app.use(express.json())  // To parse into JSON

app.use("/", userRoutes);

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})
