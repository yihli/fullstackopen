const mongoose = require('mongoose')

// check for a password
if (process.argv.length < 3) {
    console.log('Give password as argument.')
    process.exit(1)
}

// set password and place it into the MongoDB URI
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.msqcp0t.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

// allow queries to be made with any field, even not defined in the Schema
mongoose.set('strictQuery', false)

// connect to the Mongo URI
mongoose.connect(url)

// mongoose.Schema creates a schema for a note
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})



const Note = mongoose.model('Note', noteSchema)

const notes = [
    Note({
        content: 'HTML is easy',
        important: true,
    }),
    Note({
        content: 'Browser can only execute JavaScript',
        important: false,
    }),
    Note({
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true,
    }),

]

notes.forEach(note => {
    note.save().then(result => {
        console.log('Note saved!')
    })
})

// note.save().then(result => {
//     console.log(result)
//     console.log('Note saved!')
// })

// Note.find({ important: false }).then(result => {

//     if (result.length === 0) {
//         console.log('No result found')
//     }

//     result.forEach(note => {
//         console.log(note)
//     })

//     mongoose.connection.close()
// })

