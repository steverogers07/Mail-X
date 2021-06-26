const express = require('express')
const Mail = require('../models/mail')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = new express.Router()

router.post('/mail', auth, async (req,res) => {
    const mail = new Mail ({
        ...req.body
    })
    
    try {
        await mail.save()

        User.findById(req.user._id, function(err, user) {
            if(err) {
                return res.send('User Not Found')
            }
            
            user.mails.push(mail);
            user.save()
            res.status(201).send({mail, user})
        })
    } catch(e) {
        res.status(400).send(e)
    }
})


router.get('/mail/:id', async (req,res) =>{
    const _id = req.params.id

    try {
        const mail = await Mail.findOne({ _id})

        if(!mail) {
            return res.status(404).send()
        }

        res.send(mail)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/mail/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['toAddress', 'ccAddress','subject','content','enabled','frequency']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Update'})
    }

    try {
        const mail = await Mail.findOne({ _id: req.params.id})
        if(!mail) {
            return res.status(404).send()
        }

        updates.forEach((update) => mail[update] = req.body[update])
        await mail.save()
        res.send(mail)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/mail/:id', async (req, res) =>{
    try{
        const mail = await Mail.findOne({ _id: req.params.id})

        if(!mail) {
            return res.status(404).send()
        }
        
        mail["enabled"] = false
        await mail.save()
        res.send(mail)
    } catch(e) {
        res.status(400).send(e)
    }
})


module.exports = router