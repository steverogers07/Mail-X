const express = require('express')
require('./db/mongoose')
const User = require('./models/user')

const app = express()
const PORT = 3000

app.use(express.json())  

app.listen(PORT, () => {
    console.log('Server is up on port ' + PORT)
})

// First commit by Shivam