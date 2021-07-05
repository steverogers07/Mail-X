var express  = require("express");
const cors = require('cors')
var router   = express.Router();
var User     = require("../models/user");
var auth = require('../middleware/auth');
const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(process.env.CLIENT_ID)

// Show all mails
router.get('/allmails', auth, async(req, res) => {
    User.findById(req.user._id).populate("mails").exec(function(err, foundUser){
		if(err) {
			res.send({error: 'Error in database function'})
		} else {
            var allMails = []
            foundUser.mails.forEach(function(mail) {
                if(!mail.deleted) allMails.push(mail)
            })
            res.send({allMails})
        }
	});
})

const getConfig = () =>{
    return {
        sameSite: "None",
        path:'/',
        expires: new Date(new Date().getTime()+ 30* 24*60*60*1000),
        secure: true,
        httpOnly: true,
    }
}

// Show future mails
router.get('/future',auth, async(req, res) => {
    User.findById(req.user._id).populate("mails").exec(function(err, foundUser){
		if(err) {
			res.send({error: 'Error in database function'})
		} else {
            var allEnabledMails = []
            foundUser.mails.forEach(function(mail) {
                if(mail.enabled==true) allEnabledMails.push(mail)
            })
            res.send({allEnabledMails})
        }
	});
})


// Show History
router.get('/history', auth, async (req, res) => {
    User.findById(req.user._id).populate("mails").exec(function(err, foundUser){
		if(err) {
			res.send({error: 'Error in database function'})
		} else {
            var allSentMails = []
            foundUser.mails.forEach(function(mail) {
                if(mail.count>0) allSentMails.push(mail)
            })
            res.send({allSentMails})
        }
	});
})


router.post('/register',  async (req, res) => {
    
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).cookie('authtoken', token, getConfig()).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.cookie('authtoken', token, getConfig()).send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/googlelogin', async (req, res) => {
    const {tokenId} = req.body
    client.verifyIdToken({idToken: tokenId, audience: process.env.CLIENT_ID}).then(response =>{
        const {email_verified, name, email} = response.payload

        if(email_verified) {
            User.findOne({email}).exec(async (err,user) => {
                if(err) {
                    return res.status(400).send("Something went wrong....")
                }
                if(user) {
                    const token = await user.generateAuthToken()
                    res.status(201).cookie('authtoken', token, getConfig()).send({user, token})
                }
                else {
                    const password = email+'thisisit'
                    const username = name.toLowerCase().replace(' ', '')
                    const user = new User({email,username,password})
                    try {
                        await user.save()
                        const token = await user.generateAuthToken()
                        res.status(201).cookie('authtoken', token, getConfig()).send({user, token})
                    } catch(e) {
                        res.status(400).send(e)
                    }
                }
            })
        }
    })
})

// Logout User
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()

        res.clearCookie('authtoken').send()
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router;