const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Password is missing.')
    process.exit(1)
}


const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.msqcp0t.mongodb.net/cloudPhonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('Phonebook:')

    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const new_name = process.argv[3]
    const new_number = process.argv[4]

    const person = new Person({
        name: new_name,
        number: new_number,
    })

    person.save().then(result => {
        console.log('Person saved!')
        console.log(result)
        mongoose.connection.close()
    })
} else if (process.argv.length !== 5 ) {
    console.log('Not the right amount of arguments.')
}


