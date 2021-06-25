const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://captainsteve:divyansh@13@haunted.mw20x.mongodb.net/flipr?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
