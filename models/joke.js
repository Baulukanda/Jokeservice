const mongoose = require('mongoose')
const schema = mongoose.Schema

const jokeSchema = new schema({
    setup: {
        type: String,
        required: true
    },
    punchline: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Joke', jokeSchema)