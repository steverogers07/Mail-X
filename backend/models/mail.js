const mongoose = require('mongoose')
const validator = require('validator')

const mailSchema = new mongoose.Schema({
    toAddress: [{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }],
    ccAddress: [{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    }],
    subject: {
        type: String,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    enabled: {
        type: Boolean,
        required: true
    },
    frequency: {
        type:String,
        required: true,
        enum: ['20', '30', 'weekly', 'monthly', 'yearly']
    },
    count: {
        type: Number,
        required: 0
    }
})

const Mail = mongoose.model('Mail', mailSchema)
module.exports = Mail