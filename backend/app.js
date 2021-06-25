const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const PORT = 3000

app.use(express.json())  // comment

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})
// By aryan
// First commit by Shivam