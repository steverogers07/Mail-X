const jwt = require('jsonwebtoken')
const User = require('../models/user')

// Function for extracting coookie
const getCookie = (cName, cookies)=> {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(cookies); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}
const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ','')
        
        const token = getCookie('authtoken', req.header('Cookie'))
        const decoded = jwt.verify(token,'thisisit')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if(!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch(e) {
        res.status(401).send({ error: 'Pleasae Authenticate.' })
    }
    
}

module.exports = auth