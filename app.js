const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const PORT = 3000

app.use(express.json())   // To parse the request to JSON

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})

// 3 commit by arush