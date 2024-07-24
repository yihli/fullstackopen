// Variables
// ------------------------
const x = 1         // const does not allow modification
let y = 5           // let allows modification, data type as well

console.log(x,y)
y += 10;
console.log(x, y)
y = 'sometext'
console.log(x, y)
// x = 4              // error due to const

// Arrays
// ----------------------------
const t = [1, -1, 3]  // const array can still be modified

t.push(5)

console.log(t.length)
console.log(t[1])

t.forEach( value => {
    console.log(value)
})

const t2 = t.concat(5)

console.log(t)
console.log(t2)

const m = [1, 2, 3]

const m1 = m.map(value => value * 2)
console.log(m1)

const m2 = m.map( value => '<li>' + value + '</li>')
console.log(m2)

const d = [1, 2, 3, 4, 5]

const [first, second, ...rest] = d

console.log(first, second)
console.log(rest)

// Objects
// --------------------------

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const object3 = {
    name: {
        first: 'Dan',
        last: 'Abramov',
    },

    grades: [2, 3, 4, 3],
    department: 'Stanford University',
}

console.log(object1.name)
const fieldName = 'age'
console.log(object1[fieldName])

object1.address = 'Helsinki'
object1['secret number'] = 12341
console.log(object1)

// Functions
// ---------------------------
const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log(result)

// const square = p => {
//     console.log(p)
//     return p * p
// }

const square = p => p * p

const pa = [1, 2, 3]

const pas = pa.map( p => p * p)
console.log(pas)

function product(a, b) {
    return a * b
}

console.log(product(2, 6))

const average = function(a, b) {
    return (a + b) / 2
}

console.log(average(2, 6))

// Object methods and "this"
// ---------------------------

const Object = {
    name: "Wall-E",
    print: function() {
        console.log("Hello! This is " + this.name)
    }
}

Object.print()

Object.printAgain = function() {
    console.log("Hello again!")
}

Object.printAgain()

const printReference = Object.print
printReference()

setTimeout(Object.print, 1000)               // this refers to global
setTimeout(Object.print.bind(Object), 1000) // binding object allows this to be used

// Classes
// ------------------------------------

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    greet() {
        console.log('hello, my name is ' + this.name)
    }
}

const adam = new Person('Adam Ondra', 29)
adam.greet()

const jane = new Person('Jane Smith', 19)
jane.greet()

