var express  = require("express");
const cors = require('cors')
var router   = express.Router();
var User     = require("../models/user");
var auth = require('../middleware/auth');




router.get('/test',auth,   (req, res)=>{
    // console.log('In test', req.body,  req.header('Cookie'));
    res.send('Test')
})

router.post('/register',  async (req, res) => {
    console.log('Cookie in register', req.header('Cookie'));
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/login', cors(), async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router;