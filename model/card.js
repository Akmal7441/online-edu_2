const { Schema, model } = require('mongoose')

const cardSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    author: {
        required: true,
        type: String
    },
    year: Number,
    img: String
})

module.exports = model('card', cardSchema)