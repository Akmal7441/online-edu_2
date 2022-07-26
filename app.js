const express = require('express')
const app = express()
const morgan = require('morgan')
// const helmet = require('helmet')
const path = require('path')
const { create } = require('express-handlebars')
const mongoose = require('mongoose')

// Require routes
const homeRouter = require('./routes/home')
const lessonRouter = require('./routes/lesson')
const cardRouter = require('./routes/card')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

// HBS connection
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

// Dotenv
require('dotenv').config()

// Middleware functions
app.use(express.json())

// Express static middleware
app.use(express.static(path.join(__dirname, 'public')))

// Urlencoded middleware
app.use(express.urlencoded({ extended: true }))

// Module middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

// app.use(helmet())

// Routing
app.use('/', homeRouter)
app.use('/lessons/', lessonRouter)
app.use('/card/', cardRouter)

async function db() {
    try {
        await mongoose.connect('mongodb+srv://Alimov_1:PCNHrcIKi1Wxufg6@cluster0.qa2s8y6.mongodb.net/?retryWrites=true&w=majority', () => {
            console.log('MongoDB connected');
        })
    } catch (error) {
        console.error(error);
    }
}

db()

const port = normalizePort(process.env.port || 3000) // Number
app.listen(port, () => {
    console.log('Server working on port ' + port);
})

function normalizePort(val) { // number // string // false
    const num = parseInt(val)
    if (isNaN(num)) {
        return val
    }

    if (num) {
        return num
    }

    return false
}