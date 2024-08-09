const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

// Middleware Functions
// ------------------------
// functions used by express to handle request and response objects, used before
// route event handlers
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

const errorHandler = (error, request, response, next) => {
    console.log('Error:', error.message)
    if (error.name === 'ValidationError') {
        response.status(404).json({ error: error.message })
    }
    response.status(400).send({ error: "ID not found." })
    next(error)
}

// intializing a morgan token. This uses the req.body created by express.json()
// and stringifies it to log it when morgan is called for middleware
morgan.token('body', (req) => {
    return JSON.stringify(req.body)
})

// express.json() converts the data of the request into a JavaScript object and
// attaches it to request.body

// the 'body' token was defined in morgan.token
app.use(express.json())
app.use(morgan(':body'))
app.use(cors())
app.use(express.static('dist'))


// route handlers
//----------------------

// homepage
app.get('/', (req, res) => {
    res.send('<h1>Hello!</p>')
})

// information
app.get('/info', (req, res) => {
    Person.find({})
        .then(result => {
            res.send(`
                <p>Phonebook has info for ${result.length} people.</p>
                ${Date()}
            `)
        })


})

// all persons data
app.get('/api/persons', (req, res) => {
    Person.find({}).then(result => {
        res.json(result)
    })
})

// get person by id
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(result => {
        if (result) {
            res.json(result)
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

// delete person
app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id)
        .then(result => {
            console.log('Deleted successfully!')
            res.status(204).end()
        })
        .catch(error => next(error))
})


// create a new person
app.post('/api/persons', (req, res, next) => {
    // express.json() middleware creates the JS object for the data in req.body
    const body = req.body
    console.log(req.body)

    const person = new Person({
        name: body.name,
        number: body.number
    })

    
    person.save()
        .then(result => {
            console.log('Person saved!')
            res.json(result)
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    console.log("Person:", person)
    res.status(204).end()
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(result => {
            console.log('Person updated: ', person)
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})