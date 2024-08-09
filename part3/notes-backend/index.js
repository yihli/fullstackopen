require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// Middleware functions
//
// Middleware functions are executed in the order that they are called. 
// Any route handler that executs successfully prevents the remaining middleware
// from being called. 
//
// Error handling middleware functions are only executed when they are called 
// within the code. 
// ----------------------------
const unknownEndpoint = (request, response, next) => {
    console.log("Unknown endpoint.")
    response.status(404).send({ error: "unknown endpoint" })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        response.status(404).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        response.status(404).json({ error: error.message })
    }

    next(error)
}

let notes = [
    {
      id: '1',
      content: "HTML is easy",
      important: true
    },
    {
      id: '2',
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: '3',
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {

    Note.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => Number(n.id))) : 0
    return String(maxId + 1)
}

app.post('/api/notes', (request, response, next) => {
    const body = request.body

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    })

    note.save()
        .then(result => {
        response.json(result)
        })  
        .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
    const body = request.body

    const note = {
        content: body.content,
        important: body.important || false,
    }

    Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, context: 'query' })
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})