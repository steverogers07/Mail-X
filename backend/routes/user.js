var express  = require("express");
const cors = require('cors')
var router   = express.Router();
var User     = require("../models/user");
var auth = require('../middleware/auth');


// Show future mails
router.get('/future', auth, async(req, res) => {
    User.findById(req.user._id).populate("mails").exec(function(err, foundUser){
		if(err) {
			console.log(err);
		} else {
			// console.log(foundUser);
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
			console.log(err);
		} else {
			// console.log(foundUser);
            res.send({foundUser})
        }
	});
})



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

// Login User
router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

// Logout User
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