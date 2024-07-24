const express = require('express')
const morgan = require('morgan')

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

// stored data
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// route handlers
//----------------------

// homepage
app.get('/', (req, res) => {
    res.send('<h1>Hello!</p>')
})

// information
app.get('/info', (req, res) => {
    res.send(`
        <p>Phonebook has info for ${persons.length} people.</p>
        ${Date()}
    `)
})

// all persons data
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get person by id
app.get('/api/persons/:id', (req, res) => {

    // using a parameter to choose a specific person by id
    const id = req.params.id

    // find the person in the data and send response if exists
    const person = persons.find(p => p.id === id)
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

// delete person
app.delete('/api/persons/:id', (req, res) => {

    // use parameter to get id
    const id = req.params.id

    // remove person with that id from the data
    persons = persons.filter(person => person.id !== id)

    console.log(persons)
})

// helper functions to create new person
// --------------------------------------
const generateId = () => {
    return String(Math.floor(Math.random() * 100000))
}

const nameExists = (name) => {
    return persons.find(person => person.name.toLowerCase() === name.toLowerCase())   
}

// create a new person
app.post('/api/persons', (req, res) => {

    // express.json() middleware creates the JS object for the data in req.body
    const body = req.body
    console.log(req.body)

    // check if there is missing data or if the name isn't unique
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: "The name or number is missing (or both)."
        })
    }

    if (nameExists(body.name)) {
        return res.status(400).json({
            error: "The name must be unique."
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})